const template = (numOfTxs, hostAndPort) => `
    const axios = require('axios');
    const { transfer } = require('@liskhq/lisk-transactions');
    const { getAddressFromPublicKey, getKeys } = require('@liskhq/lisk-cryptography');
    const { Mnemonic } = require('@liskhq/lisk-passphrase');


    const NORMALIZER = '100000000'
    // configure how many transactions you want to send
    const numTrsToSend = ${numOfTxs};
    const timeBetweenHTTPRequests = 2;
    const transactionsToSend = [];

    console.log('Sending ${numOfTxs} transactions to the API...');

    for(let i=1; i< numTrsToSend+1; i++) {
        const { publicKey } = getKeys(Mnemonic.generateMnemonic());
        const address = getAddressFromPublicKey(publicKey);
        
        const trs = transfer({
            amount: (i * NORMALIZER).toString(),
            passphrase: 'wagon stock borrow episode laundry kitten salute link globe zero feed marble', // DevNet genesis passphrase
            recipientId: address,
        });
        transactionsToSend.push(trs);
    }

    const transactionsReqs = [];


    new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            aTrs = transactionsToSend.shift();
            transactionsReqs.push(axios.post('http://${hostAndPort}/api/transactions', aTrs));
            if(transactionsToSend.length === 0){
                console.log('All transaction promises requested...');
                clearInterval(timer);
                return resolve();
            }
        }, timeBetweenHTTPRequests);
    })
    .then(res => {
        Promise.all(transactionsReqs)
        .then(res => {
            console.log('Number of transactions accepted by the API: ', res.length);
            console.log('DONE!');
        })
        .catch(err => {
            console.log('ERROR SENDING TRANSACTIONS....');
            if(err.response && err.response.data) {
                console.log(err.response.data);
            } else {
                console.log(err);
            }
            
            console.log('•'.repeat(100));
            console.log(err.config);
        });
    })
    .catch(err => {
        console.log('Error sending transactions...');
        console.log(err);
    });
`;

(function ($) {
    var textFile = null,
        makeTextFile = function (text) {
            var data = new Blob([text], {type: 'text/plain'});

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);

            return textFile;
        };

    $('.validate-form').on('submit',function(){
        var inputs = $('.validate-input .input100');

        var hostAndPort = $(inputs[0]).val();
        var numOfTxs = $(inputs[1]).val();
        
        var finalScript = template(numOfTxs, hostAndPort);

        // downloadable file
        var link = document.createElement('a');
        link.setAttribute('download', 'benchmark-script.js');
        link.href = makeTextFile(finalScript);
        document.body.appendChild(link);

        // wait for the link to be added to the document
        // this is needed for directly downloading the file
        window.requestAnimationFrame(function () {
            var event = new MouseEvent('click');
            link.dispatchEvent(event);
            document.body.removeChild(link);
        });

        alert('Download file?');
    });
})(jQuery);
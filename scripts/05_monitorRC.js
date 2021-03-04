const fs = require('fs')
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:23001");

var rcAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_mc",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_behavior",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_bn",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "Cr",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Blocked",
				"type": "uint256"
			}
		],
		"name": "isCalled",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "behaviorsLookup",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "begin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endBBN",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "evAttr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "omega",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "CrPmax",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mc",
		"outputs": [
			{
				"internalType": "contract Management",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_subject",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_behaviorID",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_bn",
				"type": "uint256"
			}
		],
		"name": "reputationCompute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "a",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "b",
				"type": "string"
			}
		],
		"name": "stringCompare",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "base",
				"type": "uint256"
			}
		],
		"name": "updateEnvironment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
var rcAddr = "0xAEaa9A4dE3f3F59AdeAcfAb5E7D1Cd0807979f27";
var myRC = new web3.eth.Contract(rcAbi, rcAddr);

myRC.events.isCalled({
	fromBlock: 0
}, function(error, result){
		if(!error) {
			//console.log(result)
			console.log("Request from: "+result.returnValues._from);
			console.log("Behavior description: " + result.returnValues._behavior);
			console.log("Block number when behavior happen: " + result.returnValues._bn);
			console.log("Credit: " + result.returnValues.Cr);
			console.log("Blocked block number: " + result.returnValues.Blocked);
			content = result.returnValues._from + "," + result.returnValues._behavior + "," + result.returnValues._bn + "," + result.returnValues.Cr + "," + result.returnValues.Blocked + "\n";
			fs.writeFile('./rcResult.txt', content, { flag: 'a+' }, err => {});
			console.log('\n');
		}
})




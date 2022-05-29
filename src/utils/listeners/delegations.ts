import { stakeCsprTracker } from '$stores/activityLoaders';
import { ethers } from 'ethers';

export default function () {
	// Delegate Response

	/*
	{
    "id": "85e2589915ac6",
    "data": [
        {
            "approvals": [
                {
                    "signer": "019333bb6c23cb8dcd15401cbbb4fa91172ab5c646f2002e17916751c0272177fb",
                    "signature": "01f345fa5c693d0de86005d1fd8c437999650f456791447eb637be462417f4bea0d00ec0feb6a5b4717603536935edc25c22da02aeb7fecbdd764cb256b9d1fc07"
                }
            ],
            "session": {
                "storedContractByHash": {
                    "tag": 1,
                    "entryPoint": "delegate",
                    "args": {
                        "args": {}
                    },
                    "hash": {
                        "0": 147,
                        "1": 217,
                        "2": 35,
                        "3": 227,
                        "4": 54,
                        "5": 178,
                        "6": 10,
                        "7": 76,
                        "8": 76,
                        "9": 161,
                        "10": 77,
                        "11": 89,
                        "12": 43,
                        "13": 96,
                        "14": 229,
                        "15": 189,
                        "16": 63,
                        "17": 227,
                        "18": 48,
                        "19": 119,
                        "20": 86,
                        "21": 24,
                        "22": 41,
                        "23": 1,
                        "24": 4,
                        "25": 249,
                        "26": 190,
                        "27": 179,
                        "28": 38,
                        "29": 219,
                        "30": 122,
                        "31": 226
                    }
                }
            },
            "payment": {
                "moduleBytes": {
                    "tag": 0,
                    "moduleBytes": {},
                    "args": {
                        "args": {}
                    }
                }
            },
            "header": {
                "account": {
                    "isCLValue": true,
                    "data": {
                        "0": 147,
                        "1": 51,
                        "2": 187,
                        "3": 108,
                        "4": 35,
                        "5": 203,
                        "6": 141,
                        "7": 205,
                        "8": 21,
                        "9": 64,
                        "10": 28,
                        "11": 187,
                        "12": 180,
                        "13": 250,
                        "14": 145,
                        "15": 23,
                        "16": 42,
                        "17": 181,
                        "18": 198,
                        "19": 70,
                        "20": 242,
                        "21": 0,
                        "22": 46,
                        "23": 23,
                        "24": 145,
                        "25": 103,
                        "26": 81,
                        "27": 192,
                        "28": 39,
                        "29": 33,
                        "30": 119,
                        "31": 251
                    },
                    "tag": 1
                },
                "timestamp": 1653583221779,
                "ttl": 1800000,
                "gasPrice": 1,
                "bodyHash": {
                    "0": 54,
                    "1": 54,
                    "2": 249,
                    "3": 228,
                    "4": 203,
                    "5": 90,
                    "6": 170,
                    "7": 205,
                    "8": 211,
                    "9": 237,
                    "10": 21,
                    "11": 91,
                    "12": 250,
                    "13": 127,
                    "14": 32,
                    "15": 157,
                    "16": 5,
                    "17": 162,
                    "18": 61,
                    "19": 16,
                    "20": 213,
                    "21": 55,
                    "22": 134,
                    "23": 39,
                    "24": 94,
                    "25": 206,
                    "26": 125,
                    "27": 180,
                    "28": 70,
                    "29": 203,
                    "30": 196,
                    "31": 78
                },
                "dependencies": [],
                "chainName": "casper-test"
            },
            "hash": {
                "0": 44,
                "1": 199,
                "2": 29,
                "3": 244,
                "4": 133,
                "5": 85,
                "6": 6,
                "7": 27,
                "8": 96,
                "9": 205,
                "10": 230,
                "11": 199,
                "12": 68,
                "13": 60,
                "14": 28,
                "15": 41,
                "16": 52,
                "17": 203,
                "18": 173,
                "19": 165,
                "20": 11,
                "21": 218,
                "22": 180,
                "23": 2,
                "24": 195,
                "25": 248,
                "26": 3,
                "27": 71,
                "28": 162,
                "29": 243,
                "30": 138,
                "31": 237
            }
        },
        {
            "api_version": "1.4.6",
            "deploy": {
                "hash": "2cc71df48555061b60cde6c7443c1c2934cbada50bdab402c3f80347a2f38aed",
                "header": {
                    "account": "019333bb6c23cb8dcd15401cbbb4fa91172ab5c646f2002e17916751c0272177fb",
                    "timestamp": "2022-05-26T16:40:21.779Z",
                    "ttl": "30m",
                    "gas_price": 1,
                    "body_hash": "3636f9e4cb5aaacdd3ed155bfa7f209d05a23d10d53786275ece7db446cbc44e",
                    "dependencies": [],
                    "chain_name": "casper-test"
                },
                "payment": {
                    "ModuleBytes": {
                        "module_bytes": "",
                        "args": [
                            [
                                "amount",
                                {
                                    "cl_type": "U512",
                                    "bytes": "0500f2052a01",
                                    "parsed": "5000000000"
                                }
                            ]
                        ]
                    }
                },
                "session": {
                    "StoredContractByHash": {
                        "hash": "93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2",
                        "entry_point": "delegate",
                        "args": [
                            [
                                "delegator",
                                {
                                    "cl_type": "PublicKey",
                                    "bytes": "019333bb6c23cb8dcd15401cbbb4fa91172ab5c646f2002e17916751c0272177fb",
                                    "parsed": "019333bb6c23cb8dcd15401cbbb4fa91172ab5c646f2002e17916751c0272177fb"
                                }
                            ],
                            [
                                "validator",
                                {
                                    "cl_type": "PublicKey",
                                    "bytes": "0158ed3b452164d0f79e65e05cec9052f6b0acb6c470159bd9ed41037bd20c0100",
                                    "parsed": "0158ed3b452164d0f79e65e05cec9052f6b0acb6c470159bd9ed41037bd20c0100"
                                }
                            ],
                            [
                                "amount",
                                {
                                    "cl_type": "U512",
                                    "bytes": "050070c9b28b",
                                    "parsed": "600000000000"
                                }
                            ]
                        ]
                    }
                },
                "approvals": [
                    {
                        "signer": "019333bb6c23cb8dcd15401cbbb4fa91172ab5c646f2002e17916751c0272177fb",
                        "signature": "01f345fa5c693d0de86005d1fd8c437999650f456791447eb637be462417f4bea0d00ec0feb6a5b4717603536935edc25c22da02aeb7fecbdd764cb256b9d1fc07"
                    }
                ]
            },
            "execution_results": []
        }
    ]
}

	*/

	window.api.receive('delegateResponse', (response: any) => {
		response = JSON.parse(response);
		const data = response.data;
		console.log(response);

		if (Array.isArray(data)) {
			const amountStaked = +data[1].deploy.session.StoredContractByHash.args[2][1].parsed; // Amount Sent

			// Get Value to Display
			const valueStakedInCspr = +ethers.utils.formatEther(
				ethers.utils.parseUnits(amountStaked.toString(), 9),
			);
			const walletAddress = data[1].deploy.header.account; // Wallet Address

			// TODO: TAKE THE 2.5% FEE INTO CONSIDERATION AS ITS CURRENTLY NOT BEING CONSIDERED

			const returnObject = {
				id: response.id,
				wallet: walletAddress,
				totalSent: valueStakedInCspr,
			};

			stakeCsprTracker.update((stakeTxs) => {
				if (response.id && stakeTxs[response.id]) {
					stakeTxs[response.id] = stakeTxs[response.id];
					stakeTxs[response.id]!.error = null;
					stakeTxs[response.id]!.fulfilled = true;
				}
				return stakeTxs;
			});

			return returnObject;
		} else {
			stakeCsprTracker.update((stakeTxs) => {
				if (response.id && stakeTxs[response.id]) {
					stakeTxs[response.id] = stakeTxs[response.id];
					stakeTxs[response.id]!.error =
						response.message || 'Sorry, we encountered an error while trying to stake your tokens';
					stakeTxs[response.id]!.fulfilled = true;
				}
				return stakeTxs;
			});
		}

		// TODO: ADD STAKE WAITING LOGIC - TO ENABLE BETTER REACTIVITY FOR UI
	});

	// Delegate Response
	window.api.receive('undelegateResponse', (response: any) => {
		console.log(JSON.parse(response));
	});
}

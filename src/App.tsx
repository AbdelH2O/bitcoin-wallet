"use client"
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { ConnectMultiButton, PayButton, Notification, useWalletAddress, useXverseSign } from 'bitcoin-wallet-adapter';
import { useEffect } from 'react';
import { CommonSignOptions } from 'bitcoin-wallet-adapter/dist/types/types';

const XverseListingUnsignedPsbt = `cHNidP8BAFMCAAAAAY2eAJfNX305iLS3wcoAydSV3fLlswhTOSnzauI4ifaJAAAAAAD/////AQAGAAAAAAAAF6kUaCZjDq3CEhgAUJgHq4l+MlIpLE6HAAAAAAABAP04AQIAAAAAAQKCZJHc5/82iQQLBIHwTadgrr39ldYYP7oQ7WBUVPIZsQIAAAAA/////8TKUqFN+i6clUthqwHTNKoN86U7s4Iuczoriu2hRCSwAAAAAAD/////AiICAAAAAAAAIlEgwamNg/SRfxhid+iPbO5aaTYRwwH44Wj8KsAVHnC0s6UhhAEAAAAAACJRIBL2sGjymEcmEx43URFfN125o87nIsYtoisohjZsr6oZAUCffKRpcm9qKUyTeKmjrtumKD4cjhBkbypE2Z5Y/naaZkG6lfbIBsy/Gcz5SD4LBeTpmcNvD3JmlfZ8+dNCkdl+AUBxSjJPgeUsk6r4Yy4RI+W1L/INM6V6jMfL97LVTyhFpAVEGBbU+khU1Pje2KdhJ6MFTBmbiVbC9Xf6g+srKLq1AAAAAAEBKyICAAAAAAAAIlEgwamNg/SRfxhid+iPbO5aaTYRwwH44Wj8KsAVHnC0s6UBAwSDAAAAARcgs/+suUVx8rIh8UZRFajDjzxJ7oujixupMPNuRHpgWbwAAA==`;

function App() {
	const [amount, setAmount] = useState(10);
	const { connected, cardinal_address, cardinal_pubkey, ordinal_address, ordinal_pubkey } = useWalletAddress();
	const [enabled, setEnabled] = useState(false);
	const { loading, result, error, sign } = useXverseSign();

	useEffect(() => {
		if (connected) {
			setEnabled(true);
		}
		console.log({
			connected,
			cardinal_address,
			cardinal_pubkey,
			ordinal_address,
			ordinal_pubkey
		});

	}, [connected]);

	useEffect(() => {
		console.log({ result, error });
		console.log("Signing successful:", result);
	}, [result, error]);

	const handleClick = async () => {
		try {
			if (!cardinal_address) return;
			const options: CommonSignOptions = {
				psbt: XverseListingUnsignedPsbt,
				network: "Mainnet",
				action: "sell",
				inputs: [
					{
						address: ordinal_address!,
						sighash: 131,
						index: [0],
						publickey: ordinal_pubkey!,
					},
				],
			};

			await sign(options);
		} catch (e) {
			console.error("An error occurred:", error);
		}
	};

	return (
		<div className='h-screen w-screen flex items-center justify-center flex-col gap-10'>
			<main className="bg-primary flex min-h-screen flex-col items-center justify-between p-24">
				<div>
						<ConnectMultiButton />
					<div className='absolute'>
					</div>
					{cardinal_address && connected && (
						<div className="py-6">
							<PayButton
								amount={5000}
								receipient={"bc1qrwtu9ec4sl6txnxqhvgmuavm72gv32jsaz2mks"}
							/>
						</div>
					)}

					{loading && <p>Loading...</p>}

					{ordinal_address && connected && (
						<div className="py-6">
							<button
								className="bg-blue-500 px-4 py-4 rounded shadow hover:bg-blue-700"
								onClick={handleClick}
								disabled={loading}
							>
								Sign Transaction
							</button>
						</div>
					)}
					{result && (
						<p className="text-xs bwa-overflow-scroll px-4 py-1 bg-green-200 text-green-700 rounded shadow">
							Success
						</p>
					)}
					{error && (
						<span className="py-1 px-4 bg-red-200 text-red-700 rounded shadow">
							Error: {error.message}
						</span>
					)}
				</div>
				<Notification />
			</main>
		</div>
	)
}

export default App

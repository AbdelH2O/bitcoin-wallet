"use client"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletProvider } from 'bitcoin-wallet-adapter'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<WalletProvider
			customAuthOptions={{
				appDetails: { name: "Example" },
			}}
		>
			<App />
		</WalletProvider>
	</React.StrictMode>,
)

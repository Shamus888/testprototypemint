import {useState, useEffect} from "react";
import Web3 from "web3";

import ReactPlayer from 'react-player'

import logo from "../prototypelong.png"

import Mint from "./Mint";
import NFT_ABI from "../abi/NFT";

const {
    REACT_APP_NFT_ADDRESS,
    REACT_APP_VIDEO_URL,
} = process.env;

function Home() {
    const [walletState, setWalletState] = useState({
        web3: null,
        walletAddress: "",
    });

    const [dappState, setDappState] = useState({
        nft: null,
        isWhitelistActive: null,
    });

    useEffect(
        () => {
            const setupContracts = async () => {
                if (typeof window.ethereum !== 'undefined')
                    console.log('MetaMask is installed!');
                else
                    return alert('Metamask not detected');

                const [signedAccount] = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });

                const web3 = new Web3(window.ethereum);

                setWalletState({
                    ...walletState,
                    web3,
                    walletAddress: signedAccount
                });
                const nft = new web3.eth.Contract(NFT_ABI, REACT_APP_NFT_ADDRESS);
                const isWhitelistActive = await nft.methods.isWLActive().call();

                setDappState({
                    ...dappState,
                    nft,
                    isWhitelistActive,
                });
            }

            setupContracts();
        },
        [dappState, walletState]
    );

    return (
        <div>
            <div style={{marginTop: "5%"}}>
                <img src={logo} style={{width: "40%", height: "20%"}} alt=""/>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5%",
                marginLeft: "15%",
                marginRight: "15%"
            }}>
                <Mint
                    dappState={dappState}
                    walletState={walletState}
                />
                <ReactPlayer
                    url={REACT_APP_VIDEO_URL}
                    loop={true}
                    playing={true}
                    muted={true}
                />
            </div>
        </div>
    );
}

export default Home;

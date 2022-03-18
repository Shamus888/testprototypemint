import {useState} from "react";
import {BigNumber} from "ethers";

function Mint(props) {
    const [patchNum, setPatchNum] = useState(1);

    const mintWhitelist = async () => {
        const {nft} = props.dappState;
        const price = await nft.methods.getPrice().call();
        await nft.methods.whitelistMint().send({
            from: props.walletState.walletAddress,
            value: price
        });
    }

    const mintPublic = async () => {
        const {nft} = props.dappState;
        const price = await nft.methods.getPrice().call();
        await nft.methods.publicMint(patchNum).send({
            from: props.walletState.walletAddress,
            value: BigNumber.from(price).mul(BigNumber.from(patchNum))
        });
    }

    return (
        <div style={styles.div1}>
            {
                props.dappState.isWhitelistActive &&
                <div style={styles.div2}>
                    <h3>Whitelist Mint</h3>
                    <button
                        onClick={mintWhitelist}
                        style={{width: "80%", height: "50px", marginLeft: "10%", backgroundColor: "skyblue"}}
                    >
                        Mint
                    </button>
                </div>
            }

            {
                !props.dappState.isWhitelistActive &&
                <div style={styles.div2}>
                    <h3>Public Mint</h3>
                    <div style={styles.div3}>
                        <button
                            style={styles.btn}
                            onClick={
                                () => {
                                    if (patchNum === 2)
                                        setPatchNum(1);
                                }
                            }
                        >
                            -
                        </button>
                        <h4>{patchNum}</h4>
                        <button
                            style={styles.btn}
                            onClick={
                                () => {
                                    if (patchNum === 1)
                                        setPatchNum(2);
                                }
                            }
                        >
                            +
                        </button>
                    </div>
                    <button
                        style={{
                            width: "80%",
                            height: "50px",
                            marginLeft: "10%",
                            backgroundColor: "skyblue",
                            marginTop: "5%"
                        }}
                        onClick={mintPublic}
                    >
                        Mint
                    </button>
                </div>
            }
        </div>
    );
}

const styles = {
    div1: {
        display: "flex",
        margin: "1%",
        justifyContent: "center",
        flexDirection: "row",
        border: "1px solid white",
        width: "40%",
        height: "250px"
    },
    div2: {display: "flex", margin: "5%", flexDirection: "column", width: "50%"},
    div3: {display: "flex", flexDirection: "row", justifyContent: "space-around"},
    btn: {width: "50px", height: "50px"}
};

export default Mint;
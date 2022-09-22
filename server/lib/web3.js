const spl = require('@solana/spl-token')
const web3 = require('@solana/web3.js')
const key = require('../asset/key.json')

const w3 = {}

w3.wallet = key => {
  if(key){
    const keypair = {publicKey: new Uint8Array(key[0]), secretKey: new Uint8Array(key[1])}
    return new web3.Keypair(keypair) 
  }
  return web3.Keypair.generate()
}

w3.connection = isMain => new web3.Connection(web3.clusterApiUrl(isMain ? 'mainnet-beta' : 'devnet'), 'confirmed') 

w3.airdrop = async wallet => {
  const connection = w3.connection()
  
  const signature = await connection.requestAirdrop(
    wallet.publicKey,
    web3.LAMPORTS_PER_SOL
  )

  await connection.confirmTransaction(signature)
}

w3.balance = async (connection, wallet) => {
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new web3.PublicKey(wallet.publicKey),
    { programId: spl.TOKEN_PROGRAM_ID }
  )

  console.log("Token                                         Balance");
  console.log("------------------------------------------------------------");
  tokenAccounts.value.forEach((tokenAccount) => {
    const accountData = spl.AccountLayout.decode(tokenAccount.account.data);
    console.log(`${new web3.PublicKey(accountData.mint)}   ${accountData.amount}`);
  })
}

w3.mint = async (connection, payer, decimal) => {
  const mint = await spl.createMint(
    connection,
    payer,
    payer.publicKey,
    payer.publicKey,
    decimal
  )

  //console.log(mint.toBase58())
  console.log(mint)
  return mint
}

w3.mintInfo = async (connection, mint) => spl.getMint(connection, mint)
w3.mintSupply = async (connection, mint) => await w3.mintInfo(connection, mint).supply

w3.tokenAccount = async (connection, payer, mint, wallet) => {
  const tokenAccount = await spl.getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    wallet.publicKey
  )

  console.log(tokenAccount.address)
  return tokenAccount.address
}

w3.tokenAccountInfo = async (connection, tokenAccount) => {
  const info = await spl.getAccount(
    connection,
    tokenAccount
  )

  console.log(info.amount)
  return info
}

w3.mintTo = async (connection, payer, mint, tokenAccount, auth, amount) => spl.mintTo(
  connection, payer, mint, tokenAccount, auth, amount
)

// test

const init = async () => {
  const wallet = w3.wallet(key)
  const connection = w3.connection()
  //await w3.airdrop(wallet)
  const mint = new web3.PublicKey('7DQEXEfjGfTEnMVC1SG1YwUHqhyCthC7NoBs2heUEETs')
  //const mint = await w3.mint(connection, wallet, 0)

  const tokenAccount = await w3.tokenAccount(connection, wallet, mint, wallet)
  // await w3.mintTo(connection, wallet, mint, tokenAccount, wallet, 10)

  w3.balance
    ( w3.connection()
    , w3.wallet(key)
    )

  let mintInfo = await w3.mintInfo(connection, mint)
  console.log(mintInfo.supply)

  await w3.tokenAccountInfo(connection, tokenAccount)
}

init()

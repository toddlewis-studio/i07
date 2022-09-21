
// GET

// Provider
//   check for phantom on the browser
const Provider = openLink => {
  const provider = phantom?.solana
  if (provider?.isPhantom) return provider
  if(openLink) window.open('https://phantom.app/', '_blank')
}

// Connect
//   connect to phantom wallet
const Connect = async () => {
  const provider = Provider()
  console.log(provider)

  try {
    const res = await provider.connect({ onlyIfTrusted: true })
    console.log(res.publicKey.toString())
    console.log(provider.isConnected);

  } catch (er) { console.error(er) }
}

// Disconnect
//   disconnect to phantom wallet
const Disconnect = () => provider.request({ method: "disconnect" })

// OnChange
//   subscribe to an on change event with two functions
const OnChange = (onNewWallet, onDisconnect) => {
  const provider = Provider()
  if (!provider) return console.error('Phantom wallen not connected.')
  provider.on('accountChanged', publicKey => {
    if (publicKey) {
      // Set new public key and continue as usual
      if (onNewWallet) onNewWallet(publicKey)
    } else {
      // Attempt to reconnect to Phantom
      provider.connect()
        .then(publicKey => {
          // Set new public key and continue as usual
          if (onNewWallet) onNewWallet(publicKey)
        }, error => {
        // Handle connection failure
        if (onDisconnect) onDisconnect(error)
      })
    }
  })
}

const Get = { Provider, Connect, Disconnect, OnChange }

// PAY
// todo

const sendPayment = async (network) => {
  const provider = Provider()
  if (!provider) return console.error('Phantom wallen not connected.')
  const connection = new Connection(network)
  const transaction = new Transaction()
  const { signature } = await provider.signAndSendTransaction(transaction)
  return connection.getSignatureStatus(signature)
}

const Pay = { Send: sendPayment }

//MSG 

const sendMsg = message => {
  const provider = Provider()
  if (!provider) return console.error('Phantom wallen not connected.')
  const encodedMessage = new TextEncoder().encode(message);
  return provider.signMessage(encodedMessage, "utf8")
}

const Msg = { Send: sendMsg }

export default { Get, Pay, Msg }
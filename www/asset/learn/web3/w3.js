// Using SOLANA web3 script: <script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js"></script>

// GET

const Get = {}

Get.Provider = openLink => {
  const provider = phantom?.solana
  if (provider?.isPhantom) return provider
  if(openLink) window.open('https://phantom.app/', '_blank')
}

Get.Connect = async () => {
  const provider = Get.Provider()
  console.log(provider)

  try {
    const res = await provider.connect({})
    console.log(res.publicKey.toString())
    console.log(provider.isConnected);

  } catch (er) { console.error(er) }
}

Get.Disconnect = () => provider.request({ method: "disconnect" })

//MSG 

const Msg = {}

Msg.Send = message => {
  const provider = Get.Provider()
  if (!provider) return console.error('Phantom wallet not connected.')
  const encodedMessage = new TextEncoder().encode(message);
  return provider.signMessage(encodedMessage, "utf8")
}

export default { Get, Msg }
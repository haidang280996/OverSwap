// script.js

document.querySelectorAll('nav a').forEach(link => {

  link.addEventListener('click', function(e){

    e.preventDefault();

    const target =
      document.querySelector(
        this.getAttribute('href')
      );

    target.scrollIntoView({
      behavior:'smooth'
    });

  });

});

const connectButton =
  document.getElementById('connectWallet');

async function connectWallet(){

  if(typeof window.ethereum === 'undefined'){

    alert('Please install MetaMask');

    return;
  }

  try{

    const provider =
      new ethers.BrowserProvider(
        window.ethereum
      );

    await provider.send(
      "eth_requestAccounts",
      []
    );

    const signer =
      await provider.getSigner();

    const address =
      await signer.getAddress();

    connectButton.innerText =
      address.slice(0,6) +
      "..." +
      address.slice(-4);

  }catch(error){

    console.log(error);

  }
}

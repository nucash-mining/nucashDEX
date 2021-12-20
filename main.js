########################
Moralis.initialize("bjERDPHVF8C8djWqWLtev2vXmK2qM6WPW2ufhufQ");
Moralis.serverURL = "https://3dt2ixtrpqdt.usemoralis.com:2053/server";

async function init(){
    await Moralis.initPlugins();
    await Moralis.enable();
    listAvailableToken();
    
}

async function listAvailableTokens(){
    const result = await Moralis.Plugin.oneInch.getSupportTokens({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
    });
    const tokens = result.tokens;
    let parent = document.getElementById("token_list");
    for( const address in tokens){
        let token = result[address];
        let div = document.createElement("div");
        div.className = "token_row";
        let html = `
        <img class="token_list_img" src="${token.logoURI}">
        <span class="token_list_text">${token.symbol}</span>
        `
        div.innerHTML= html;
        parent.appendChild(div);
    }
}

async function login() {
    try {
        currentUser = Moralis.User.current();
        if(!currentUser){
           currentUser = await Moralis.Web3.authenticate();
        }
    } catch (error) {
         console.log(error);
    }
}

function openModal(){
    document.getElementById("token_modal").style.display = "block";
}
function closeModal(){
    document.getElementById("token_modal").style.display = "none";
}

init():
document.getElementById("modal_close").onclick = closeModal;
document.getElementById("from_token_select").onclick = openModal;
document.getElementById("login_button").onclick = login;

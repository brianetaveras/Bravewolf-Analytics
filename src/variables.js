export default Object.freeze({
    URLWEB: (document.querySelector('#urlweb') != null ? String.prototype.concat(document.querySelector('#urlweb').value,"/api/"): String.prototype.concat(window.location.protocol,"//bravewolfdev.com/main/office/api/")),
    URLASSETS: (document.querySelector('#urlassets') != null ? String.prototype.concat(document.querySelector('#urlassets').value): String.prototype.concat(window.location.protocol,"//bravewolfdev.com/main/office/public/assets/")),
    APP_NAME: "Analytics DSO",
    AUTHOR: "Brian Taveras",
    Website: "#",
    KEYGEN: 'abc123keygen',
    IDUSER: (document.querySelector('#iduser') != null ? document.querySelector('#iduser').value : 1)
})
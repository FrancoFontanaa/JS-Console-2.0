const body = document.getElementsByTagName('body')[0];
body.innerHTML += '<style id="consoleStyle"></style>';
body.innerHTML += '<style id="tilesStyle"></style>';

const init = () => {
    const consoleDiv = document.getElementById('console');
    
    if (consoleDiv == null) {
        console.error("Div with identifier 'console' not found, please create one to display the console properly (<div id='console'></div>).");
        return
    } else {
        console.oldlog = console.log;
        console.oldclear = console.clear;
        const consoleStyle = document.getElementById('consoleStyle');
        const tilesStyle = document.getElementById('tilesStyle');
        const createdTiles = []
        let tilesize;
            
        console.config = (configObject = {}) => {

            configObject.tileSize = configObject.tileSize || "20px";
            configObject.fontSize = configObject.fontSize || "medium";
            configObject.textColor = configObject.textColor || "white";
            configObject.bgColor = configObject.bgColor || "#2d2d2d";
            configObject.aspectRatio = configObject.aspectRatio || "1 / 1";
            configObject.maxWidth = configObject.maxWidth || "800px";
            configObject.disableOldLog = configObject.disableOldLog || false;

            consoleStyle.innerHTML = `
                #console {
                    font-size: ${configObject.fontSize};
                    color: ${configObject.textColor};
                    background: ${configObject.bgColor};
                    aspect-ratio: ${configObject.aspectRatio};
                    max-width: ${configObject.maxWidth};
                    width: 100%;
                }
                #console .line {
                    display: flex;
                    align-items: center;
                    height: ${configObject.tileSize};
                }
            `;
            tilesize = configObject.tileSize;
            globalThis.disableOldLog = configObject.disableOldLog;
        };

        console.newTile = (configObject = {}) => {
            configObject.tileName = configObject.tileName || "defaultTile";
            configObject.tileColor = configObject.tileColor || "white";
            configObject.innerText = configObject.innerText || "";
            configObject.innerTextColor = configObject.innerTextColor || "black";
            configObject.borderSize = configObject.borderSize || "1px";
            configObject.borderColor = configObject.borderColor || "gray";
            if (createdTiles.includes(configObject.tileName)) {
                console.error(`A tile named "${configObject.tileName}" already exists!`);
                return
            } else {
                createdTiles.push(configObject.tileName);
                switch (true) {
                    case (configObject.innerText == ""):
                        tilesStyle.innerHTML += `
                            .${configObject.tileName} {
                                position: relative;
                                width: ${tilesize};
                                height: ${tilesize};
                                background: ${configObject.tileColor};
                                color: ${configObject.innerTextColor};
                                border: ${configObject.borderSize} solid ${configObject.borderColor};
                            }
                        `
                        break;
                    case (configObject.innerText != ""):
                        tilesStyle.innerHTML += `
                            .${configObject.tileName} {
                                position: relative;
                                width: ${tilesize};
                                height: ${tilesize};
                                background: ${configObject.tileColor};
                                color: ${configObject.innerTextColor};
                                border: ${configObject.borderSize} solid ${configObject.borderColor};
                            }
                            .${configObject.tileName}::after {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                                content: '${configObject.innerText}';
                                z-index: 1
                            }
                        `;
                        globalThis[configObject.tileName+"Text"] = configObject.innerText;
                        break;
                }
                globalThis[configObject.tileName] = `<div class=${configObject.tileName}></div>`;
            }
        };

        console.log = (message) => {
            if (!disableOldLog && !message.includes("</div>")) {
                console.oldlog(message);
            } else if (!disableOldLog) {
                let splitedMessage = message.replace(/<div class=|><|div>/g,'').replace(/\//g,'|').split('|');
                let fixedMessage = "";
                splitedMessage.forEach(text => {
                    if (globalThis[text+"Text"] == undefined && globalThis[text] != undefined) {
                        fixedMessage += "[_]"
                    } else if (globalThis[text] != undefined) {
                        fixedMessage += `[${globalThis[text+"Text"].split("")[0]}]`
                    } else {
                        fixedMessage += text
                    }
                });
                console.oldlog(`${fixedMessage}`)
            }
            consoleDiv.innerHTML += `<div class="line">${message}</div>`;
        };
        
        console.clear = ()=>{
            if (!disableOldLog) {
                console.oldclear();
            }
            consoleDiv.innerHTML = "";
        };

        console.help = () => {

            console.oldlog(`
==================================
The new commands added are:
==================================
    console.config(
        {
            tileSize: string,
            fontSize: string,
            textColor: string,
            bgColor: string,
            aspectRatio: string,
            maxWidth: string,
            disableOldLog: bool
        }
    )
==================================
    console.newTile(
        {
            tileName: string,
            tileColor: string,
            innerText: string,
            innerTextColor: string,
            borderSize: string,
            borderColor: string
        }
    )
==================================
Console 2.0 by @francofontana.dev
==================================
`);
        }

        console.config();
        
    }
}

console.log("Tip: use the command console.help() to see the new commands.");
console.log("Console 2.0 by @francofontana.dev");
document.addEventListener("DOMContentLoaded", init())

export default console;
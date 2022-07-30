==============================================
How to use Console 2.0 by @francofontana.dev
==============================================
1) This tool is intended to be used as a
module, so it's on strict mode, keep that in 
mind.
2) When you import the module, everything is 
ready to work, except for the div, wich div?
the module needs a div with id "console" to 
display the console 2.0.
3) You can disable the old console log for
optimization with the console.config command.
4) You can use css gradients as the background 
values.
=============================================
The new commands added are:
=============================================
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
=============================================
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
=============================================
The default values are:
=============================================
    console.config(
        {
            tileSize: "20px",
            fontSize: "medium",
            textColor: "white",
            bgColor: "#2d2d2d",
            aspectRatio: "1 / 1",
            maxWidth: "800px",
            disableOldLog: false
        }
    )
=============================================
    console.newTile(
        {
            tileName: "defaultTile",
            tileColor: "white",
            innerText: "",
            innerTextColor: "black",
            borderSize: "1px",
            borderColor: "gray"
        }
    )

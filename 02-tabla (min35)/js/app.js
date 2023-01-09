const boton = d3.select("#boton")

const render = async () => {
    const data = await d3.json("https://randomuser.me/api")
    console.log(data.results)
}

boton.on("click", () => render())
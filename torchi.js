
let my_array = [
    { name: "ahmed", description: "torchi ahmed mbarek" },
    { name: "torchi9a", description: "dadza dzadza mrgtrgrh" }
];
let search_query = "ajmed m";

const simplify = (str) => {
    return str.replace(/\s+/g, ' ').replace("<script></script>", "").replace("<script>", "").replace("<script", "").replace("</script>", "").replace(/\s+/g, ' ').trim().split(' ');
}

search_query = [...new Set(simplify(search_query))];

const search_algorithm = () => {
    let found = false;
    let foundProducts = [];

    for (let i = 0; i < search_query.length; i++) {
        my_array.forEach(product => {
            if (product.name.toLowerCase().indexOf(search_query[i].toLowerCase()) !== -1) {
                foundProducts.push(product.name);
                found = true;
            }
        });
    }


    foundProducts = [...new Set(foundProducts)];
    return { found, foundProducts };
}

let { found, foundProducts } = search_algorithm();

if (found) {
    foundProducts.forEach((element) => { console.log(element); });
} else {
    console.log("not found !");
}


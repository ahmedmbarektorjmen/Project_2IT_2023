import uuid
import json

# Load JSON data from file
with open("./products.json", 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define a function to add a new product to the data


def add_product(name, image, description, price):
    # Get the last product in the list
    last_product = data["products"][-1]
    # Extract the last product's ID and add 1 to it to generate a new ID
    new_id = last_product["id"] + 1
    # Create a new product dictionary
    new_product = {"id": new_id, "name": name,
                   "image": image, "description": description, "price": price}
    # Add the new product to the list of products
    data["products"].append(new_product)
    # Write the updated data back to the file
    with open("./products.json", 'w', encoding='utf-8') as f:
        json.dump(data, f)


name = input('Enter the name: ')
image = input('Enter the image name: ')
description = input('Enter the description: ')
price = input('Enter the price: ')

# Example usage:
add_product(name, "/files/search/"+image, description, price)

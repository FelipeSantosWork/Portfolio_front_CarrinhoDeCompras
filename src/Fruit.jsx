import { useState } from "react";


export const Fruit = () => {

    const [fruits, setFruits] = useState ([
        { id: crypto.randomUUID(), name: "Damasco", price: 5 },
        { id: crypto.randomUUID(), name: "Melancia", price: 10 },
        { id: crypto.randomUUID(), name: "Banana", price: 3.5 },
        { id: crypto.randomUUID(), name: "Laranja", price: 1 },
        { id: crypto.randomUUID(), name: "Amora", price: 7 },
        { id: crypto.randomUUID(), name: "Côco", price: 15 },
    ]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const formatPrice = (price) => {
        const opts = { style: "currency", currency: "BRL" };
        return price.toLocaleString("pt-BR", opts);
    };

    const totalPrice = () => {
        const total = fruits.reduce((prev, curr) => prev + curr.price, 0);
        return formatPrice(total);
    };
    const addFruit = ({ name, price }) => {
        const newFruit = {id: crypto.randomUUID(), name, price};
        setFruits([...fruits, newFruit]);

        setName("");
        setPrice("");
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log({ name, price });
        if (name && price) {
            addFruit({name,price});
        }
    };
    const removeFruit = (id) => {
        const filteredFruits = fruits.filter((fruit) => fruit.id !== id );
        setFruits(filteredFruits);
    };
    return (
        <>
            <form onSubmit={(e) => onSubmit(e)}>
                <h2>Adicionar uma nova fruta</h2>
                <div>
                    <label htmlFor="">Nome</label>
                    <input required value={name} type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Preço</label>
                    <input required value={price} type="number" min={0} onChange={(e) => setPrice(parseInt(e.target.value))} />
                </div>
                <button type="submit">Adicionar ao carrinho</button>
            </form>
            <section>
                <h2>Preço do carrinho</h2>
                <p>{totalPrice()}</p>
            </section>
            <section>
                <h2>Carrinho de compras</h2>
                <ul>
                    {fruits.map(({ id, name, price }) => (
                        <li>
                            <p>Nome {name}</p>
                            <p>Preço {formatPrice(price)}</p>
                            <button onClick={() => removeFruit(id)}>Remover Fruta</button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
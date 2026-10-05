import React from "react";
import {createRoot} from "react-dom/client";
import {Search,ShoppingBag,Heart,Plus,Minus,Star} from "lucide-react";
import "./styles.css";

type Product={id:number;name:string;category:string;price:number;rating:number;image:string};
const products:Product[]=[
{id:1,name:"Aero Wireless Headphones",category:"Audio",price:4999,rating:4.8,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"},
{id:2,name:"Minimal Desk Lamp",category:"Home",price:2299,rating:4.6,image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80"},
{id:3,name:"Urban Smart Watch",category:"Wearables",price:6499,rating:4.7,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"},
{id:4,name:"Everyday Backpack",category:"Bags",price:3199,rating:4.5,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"},
{id:5,name:"Studio Mechanical Keyboard",category:"Tech",price:5799,rating:4.9,image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80"},
{id:6,name:"Classic Running Shoes",category:"Fashion",price:4299,rating:4.7,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"}
];

function App(){
 const [query,setQuery]=React.useState(""); const [cat,setCat]=React.useState("All"); const [cart,setCart]=React.useState<Product[]>(()=>JSON.parse(localStorage.getItem("cart")||"[]")); const [wish,setWish]=React.useState<number[]>([]);
 React.useEffect(()=>localStorage.setItem("cart",JSON.stringify(cart)),[cart]);
 const filtered=products.filter(p=>(cat==="All"||p.category===cat)&&p.name.toLowerCase().includes(query.toLowerCase()));
 const add=(p:Product)=>setCart([...cart,p]); const remove=()=>setCart(cart.slice(0,-1));
 return <div>
  <header><div className="logo">NOVA<span>.</span></div><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/></div><div className="head-actions"><Heart/><div className="bag"><ShoppingBag/><b>{cart.length}</b></div></div></header>
  <section className="hero"><div><p>CURATED EVERYDAY ESSENTIALS</p><h1>Good design.<br/><i>Better living.</i></h1><span>Discover useful products designed for modern work and life.</span></div></section>
  <main><div className="bar"><div><h2>Featured products</h2><small>{filtered.length} products</small></div><select value={cat} onChange={e=>setCat(e.target.value)}><option>All</option>{[...new Set(products.map(p=>p.category))].map(c=><option key={c}>{c}</option>)}</select></div>
   <div className="products">{filtered.map(p=><article className="product" key={p.id}><div className="image-wrap"><img src={p.image} alt={p.name}/><button className="wish" onClick={()=>setWish(wish.includes(p.id)?wish.filter(x=>x!==p.id):[...wish,p.id])}><Heart fill={wish.includes(p.id)?"currentColor":"none"}/></button></div><div className="info"><small>{p.category}</small><h3>{p.name}</h3><div className="rating"><Star size={14} fill="currentColor"/> {p.rating}</div><div className="bottom"><strong>₹{p.price.toLocaleString("en-IN")}</strong><button onClick={()=>add(p)}><Plus size={16}/> Add</button></div></div></article>)}</div>
  </main>
  <div className="cart"><div><ShoppingBag size={18}/><strong>{cart.length} items</strong></div><div><span>Last added: {cart.length?cart[cart.length-1].name:"Nothing yet"}</span><button onClick={remove} disabled={!cart.length}>Undo</button></div></div>
 </div>
}
createRoot(document.getElementById("root")!).render(<App/>);
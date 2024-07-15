

const getRecentData = async (name: string) => {
    const res = await fetch(`http://localhost:4000/getRecentInfo/${name}`, {
        method: 'GET',
    })
    if(!res.ok) {
        throw new Error("Something went Wrong");
    }
    return res.json();
}
const getTime = () => {
    let d = new Date();
    let h = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
    let m = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
    return m + " : " + h;
}

export default getTime;
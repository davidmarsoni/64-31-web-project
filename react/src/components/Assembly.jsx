

const Assembly = (args) => {
    switch (args.type) {
        case "title":
            return (
                <h1>{args.data}</h1>
            );
        case "subtitle":
            return (
                <h2>{args.data}</h2>
            );
        case "text":
            return (
                <p>{args.data}</p>
            );
        case "img":
            return (
                <img src={args.data} alt="img"></img>
            );
        case "html":
            return (
                <div dangerouslySetInnerHTML={{__html: args.data}}></div>
            );
        default:
            return (
                <p>error</p>
            );
    }
}

export default Assembly;
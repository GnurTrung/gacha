const useAddScript = () => {
    const addScript = (options) => {
        const { src, defer = true, type = "application/javascript" } = options;
        const script = document.createElement('script');
        script.src = src;
        script.defer = defer;
        script.type = type;
        document.body.appendChild(script);
        return script
    }
    const removeScript = (script) => {
        document.body.removeChild(script);
    }
    return { addScript, removeScript }
}
export default useAddScript;
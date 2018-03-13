const renderDOM = (child, root) => {
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    root.appendChild(child);
};

export default renderDOM;
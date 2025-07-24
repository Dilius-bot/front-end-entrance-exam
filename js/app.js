document.addEventListener("DOMContentLoaded", function () {
    const editableElements = document.querySelectorAll(".editable");
    const editButton = document.querySelector(".edit__button");
    let editMode = false;

    document
        .querySelector(".download__button")
        .addEventListener("click", function () {
            window.print();
        });

    function animationForText(element) {
        element.classList.add("text-animation");
        setTimeout(() => element.classList.remove("text-animation"), 500);
    }

    editableElements.forEach((el) => {
        const id = el.id;
        const savedValue = localStorage.getItem(id);
        if (savedValue) {
            el.textContent = savedValue;
        }
    });

    editButton.addEventListener("click", function () {
        editMode = !editMode;
        this.textContent = editMode
            ? "Закончить редактирование"
            : "Редактировать";

        editableElements.forEach((el) => {
            const id = el.id;
            el.contentEditable = editMode;
            el.addEventListener("input", (event) => {
                const currentElement = event.target;
                if (currentElement.id == id) {
                    animationForText(el);
                }
                localStorage.setItem(id, currentElement.textContent);
            });
        });
    });
});

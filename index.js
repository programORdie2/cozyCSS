function addAllTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach((e) => {
        const delay = e.getAttribute('data-tooltip-delay') || 0;
        let isHovered = false;

        e.addEventListener('mouseover', () => {
            if (isHovered) return;
            isHovered = true;

            setTimeout(() => {
                if (!isHovered) return;
                const ttElem = document.createElement('span');
                ttElem.classList.add('tooltip');
                ttElem.innerHTML = e.getAttribute('data-tooltip');
                e.appendChild(ttElem);
            }, delay);
        });

        e.addEventListener('mouseout', () => {
            if (!isHovered) return;
            isHovered = false;
            e.querySelector('.tooltip')?.remove();
        });
    });
}

function addAllDropdowns() {
    document.querySelectorAll('.dropdown').forEach((e) => {
        const button = e.querySelector('button');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-haspopup', 'true');

        button.addEventListener('click', () => {
            e.classList.toggle('open');
            button.setAttribute('aria-expanded', e.classList.contains('open'));
        });

        e.querySelector('div').querySelectorAll('button').forEach((btn) => {
            btn.addEventListener('click', () => {
                button.innerHTML = btn.innerHTML;
                e.setAttribute('data-value', btn.getAttribute('data-value'));

                button.setAttribute('aria-expanded', 'false');
                e.classList.remove('open');
            })
        })
    });
}

document.addEventListener('click', (e) => {
    if (!e.target.matches('.dropdown > button')) {
        document.querySelectorAll('.dropdown.open').forEach((e) => {
            e.classList.remove('open');
        });
    };
});

addAllTooltips()
addAllDropdowns()
function isFriday13th(year, month) {
    const d = new Date(year, month - 1, 13);
    return d.getDay() === 5; // Friday
}

function getNextFriday13th(fromDate = new Date()) {
    let search = new Date(fromDate.getTime());
    // start searching from the 13th of the current month
    search.setDate(13);
    if (search < fromDate) {
        search.setMonth(search.getMonth() + 1);
    }
    while (true) {
        const year = search.getFullYear();
        const month = search.getMonth() + 1;
        if (isFriday13th(year, month)) {
            return search;
        }
        search.setMonth(search.getMonth() + 1);
    }
}

function formatDate(date) {
    const y = date.getFullYear();
    const m = ("0" + (date.getMonth() + 1)).slice(-2);
    const d = ("0" + date.getDate()).slice(-2);
    return `${y}年${m}月${d}日`;
}

function showNextFriday() {
    const next = getNextFriday13th();
    document.getElementById('next-date').textContent = `次の13日の金曜日は ${formatDate(next)} です。`;
}

function generateStats() {
    const container = document.getElementById('stats-grid');
    if (!container) return;
    // header row with month names
    const months = ['','1','2','3','4','5','6','7','8','9','10','11','12'];
    months.forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'year-label';
        div.textContent = i === 0 ? '' : m;
        container.appendChild(div);
    });
    for (let year = 2001; year <= 2100; year++) {
        let count = 0;
        const label = document.createElement('div');
        label.className = 'year-label';
        container.appendChild(label);
        for (let month = 1; month <= 12; month++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (isFriday13th(year, month)) {
                cell.classList.add('friday');
                count++;
            }
            container.appendChild(cell);
        }
        label.textContent = `${year} (${count})`;
    }
}

document.addEventListener('DOMContentLoaded', showNextFriday);

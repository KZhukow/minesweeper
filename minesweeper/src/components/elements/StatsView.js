import { formatTime } from '../../utils/utils';
import getDivElement from './divElement';

export default function StatsView(stats = []) {
  const element = getDivElement(['statsViewContainer']);
  const title = getDivElement(['statsViewTitle']);
  title.innerHTML = 'Statistic';
  element.appendChild(title);
  if (stats.length) {
    const statsTable = document.createElement('table');
    statsTable.classList.add('statsTable');
    statsTable.insertAdjacentHTML('afterbegin', `
      <thead>
        <tr>
          <th>Date</th>
          <th>Difficult</th>
          <th>Width</th>
          <th>Height</th>
          <th>Mines</th>
          <th>Time</th>
          <th>Click</th>
        </tr>
      </thead>
      <tbody>
        ${stats.map((it) => `
          <tr>
            <td>${(new Date(it.date)).toLocaleDateString().slice(0, -5)}, ${(new Date(it.date)).toLocaleTimeString().slice(0, -3)}</td>
            <td>${it.difficult}</td>
            <td>${it.width}</td>
            <td>${it.height}</td>
            <td>${it.mines}</td>
            <td>${formatTime(it.time)}</td>
            <td>${it.clickCount}</td>
          </tr>
        `).join('')}
      </tbody>
    `);
    element.appendChild(statsTable);
  } else {
    const emptyStateElement = getDivElement(['statsViewEmptyStateTitle']);
    emptyStateElement.innerHTML = 'No records found. Go win some games.';
    element.appendChild(emptyStateElement);
  }

  return element;
}

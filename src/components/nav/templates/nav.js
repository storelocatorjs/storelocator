import 'components/nav/nav.css'

export default function TemplateNav() {
	return `
        <nav class="nav">
            <ul class="nav-list">
                <li class="nav-listItem active">
                    <button class="nav-Button" data-switch-view data-target="map">
                        Map
                    </button>
                </li>
                <li class="nav-listItem">
                    <button class="nav-button" data-switch-view data-target="list">
                        List
                    </button>
                </li>
            </ul>
        </nav>
	`
}

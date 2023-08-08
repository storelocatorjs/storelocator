export default function TemplateNav() {
	return `
        <nav class="sl-nav">
            <ul class="sl-nav-list">
                <li class="sl-nav-listItem sl-active">
                    <button class="sl-nav-button" data-switch-view data-target="map">
                        Map
                    </button>
                </li>
                <li class="sl-nav-listItem">
                    <button class="sl-nav-button" data-switch-view data-target="list">
                        List
                    </button>
                </li>
            </ul>
        </nav>
	`
}

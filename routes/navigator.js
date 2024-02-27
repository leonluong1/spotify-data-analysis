var html_block = `
<div class="navigator">
    <a href="/" class="nav-item" title="Home">Home</a>
    <a href="/dashboard" class="nav-item" title="Dashboards">Dashboards</a>
    <a href="/model" class="nav-item" title="Model">Model</a>
    <a href="/exploration" class="nav-item" title="Exploration">Exploration</a>
    <a href="/about" class="nav-item" title="About Us">About Us</a>
    <a href="/resources" class="nav-item" title="Resources">Resources</a>
    <div class="nav-item playlist-nav" title="Playlists">Playlists
        <ul class="playlist-content">
            <li class="playlist-content-item" ><a href="/playlists#ahlden">Ahlden Brough</a></li>
            <li class="playlist-content-item" ><a href="/playlists#daniel">Daniel Rose</a></li>
            <li class="playlist-content-item" ><a href="/playlists#immanuel">Immanuel KC Onuoha</a></li>
            <li class="playlist-content-item" ><a href="/playlists#martin">Martin Perez</a></li>
            <li class="playlist-content-item" ><a href="/playlists#leon">Leon Luong</a></li>
            <li class="playlist-content-item" ><a href="/playlists#brian">Brian Perry</a></li>
        </ul>
    </div>
</div>
`;
    

var body = d3.select("body");
body.insert("div", ":first-child").html(html_block);
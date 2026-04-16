# Netlify redirects file
# Redirect non-www to www (or vice versa)
http://frameworkstudio.pl/* https://www.frameworkstudio.pl/:splat 301!
https://frameworkstudio.pl/* https://www.frameworkstudio.pl/:splat 301!

# SPA fallback - all routes should serve index.html
/*    /index.html   200

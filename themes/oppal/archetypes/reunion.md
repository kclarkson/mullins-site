+++
# Reunion year scaffold. Create a year as a nested SECTION so its subpages get
# their own URLs:  hugo new reunion/<year>/_index.md
# (subpages: hugo new reunion/<year>/register.md, schedule.md, travel.md, …)
#
# `type = "reunionyear"` routes this landing to layouts/reunionyear/list.html.
# Structured fields drive the quick-facts bar, the hero, and the build-time
# featured-reunion selection (§5). Prose goes in the body below; repeatable
# blocks (schedule rows, FAQ) live in the typed fields here so editors stay
# inside TinaCMS without touching templates.
title = '{{ replace .File.ContentBaseName "-" " " | title }} Mullins Family Reunion'
type = 'reunionyear'
date = {{ .Date }}            # START date — drives sorting/selection. EDIT THIS.
end_date = ''                 # e.g. 2028-06-21
city = ''                     # e.g. "Charlotte, NC"
theme = ''                    # e.g. "Carolina Connection"
hotel = ''
hotel_rate = ''               # e.g. "$179/night"
venue = ''
register_deadline = ''        # e.g. 2028-05-31
cover_image = ''              # filename in the page bundle, e.g. cover.jpg
draft = true

# Schedule rows (rendered by the schedule partial). Add/remove freely.
# [[schedule]]
#   day = 'Friday'
#   time = '6:00 PM'
#   title = 'Meet & Greet'
#   location = ''

# FAQ entries (rendered by the faq partial / accordion).
# [[faq]]
#   q = ''
#   a = ''
+++

Overview prose for this reunion goes here.

# Dazn Static Content API

Fetching live static rails content from the DAZN public API.

## Notes

Requests for static data are done in 3 phases recursively.

1. Fetch Rails - required prams include region and page (i.e. `CA` and `home`) returning `.json` of rail including each rail id.

2. Fetch Tiles - required prams include rail id returning `.json` of all rail content including list of image ids.

3. Fetch Image - required prams include image id returning a `.jpg` file.

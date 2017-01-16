chrome.downloads.onDeterminingFilename.addListener(function(item, __suggest) {
    function suggest(filename, conflictAction) {
        __suggest({
            filename: filename,
            conflictAction: conflictAction,
            conflict_action: conflictAction
        });
        // conflict_action was renamed to conflictAction in
        // https://chromium.googlesource.com/chromium/src/+/f1d784d6938b8fe8e0d257e41b26341992c2552c
        // which was first picked up in branch 1580.
    }
    // "https://releases.1c.ru/version_file?nick=Platform83&ver=8.3.9.1850&path=Platform\8_3_9_1850\clientosx.dmg"
    // "https://releases.1c.ru/version_file?nick=Platform83&ver=8.3.9.1850&path=Platform\8_3_9_1850\thin.client.rpm64.tar.gz"
    parts = item.referrer.match(".*://releases.1c.ru/.*?nick=(.*)&ver=(.*)&path=(.*)");
    fparts = item.filename.replace("thin.client.deb32", "tclient-deb-x86").replace("client.deb32", "client-deb-x86").replace("thin.client.deb64", "tclient-deb-x64").
            replace("client.deb64", "client-deb-x64").replace(".deb", "-server-deb-x86").replace(".deb64", "-server-deb-x64").replace("thin.client.rpm32", "tclient-rpm-x86").
            replace("client.rpm32", "client-rpm-x86").replace("thin.client.rpm64", "tclient-rpm-x64").replace("client.rpm64", "client-rpm-x64").replace(".rpm", "-server-rpm-x86").
            replace(".rpm64", "-server-rpm-x64").replace(".windows", "-server-win-x86").replace(".windows64", "-server-win-x64").replace("setuptc", "tclient-win-x86").
            replace("setuptc64", "tclient-win-x64").split("\.");
    fnm = "1c-";
    for (o in fparts) {
        if ((o == fparts.length - 1) || (fparts[o] == "tar")) {
            if(fparts[o] == "tar") {
                fnm += "-" + fparts[o] + "." + fparts[fparts.length-1];
                break;
            } else {
                fnm += "-" + fparts[o];
            }
        } else {
            if (fnm == "1c-") {
                fnm += fparts[o]
            } else {
                fnm += "." + fparts[o]
            };
        }
    }
    fnm.
    if (fnm != "1c-") suggest(fnm, 'prompt');
});

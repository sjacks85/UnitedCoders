# UnitedCoders

GitHub Installation & Cloning:

(0) Check whether you have Git installed by opening your temrinal and entering "git --version". 
- Note, if you have a Mac and don't have Git installed, you'll be prompted to install it at this point.
(1) Download Git here if you don't already have it: https://git-scm.com/downloads
(2) Create a folder on your local computer to keep your GitHub Project(s).
(3) Via the terminal, navigate to this folder and enter: "git clone https://github.com/sjacks85/UnitedCoders.git"
- Note: You may be prompted to enter your GitHub Username/Password. 
If this is something you'd rather not deal with, checkout this site: https://www.freecodecamp.org/news/how-to-fix-git-always-asking-for-user-credentials/
(4) If all goes well, you should see a new folder called "United Coders" with a README file.
(5) Feel free to practice pulling, commiting, pushing by adding your name to this file.

Most Common Git Commands:

(0) Make sure you're inside the "UnitedCoders" git folder, and "git status" to know the state of your local branch.
(1) Always "git pull". In particular, from master.
(2.a) Use "git add <name-of-file>" to add new files. (Or "git add ." which adds all new files.)
(2.b) After making an edit to or adding a file "git commit -m <'enter message here'>" (Don't incude angle brackets.)
(3) After commiting, "git push"

Best Practice(s):
It's generally not a good idea to directly edit master. Always create a new branch from master then merge back into master. This will avoid merge conflicts (which can get really tricky really fast).
There's definitely more best practice tips that can be added, but that's the big one.

How to Branch & Merge:

(1) Navigate to the branch you want to branch from with "git checkout <branch-to-branch-from>"
	- Note: This will probably usually be master - "git checkout master"
(2) Now, create a new branch with "git checkout -b <name-of-new-branch>"
	- Note: You can give it any name that isn't already in use and is easy to identify.
(3) Navigate to your new branch with "git checkout <name-of-new-branch>"
(4) Make your desired edits to the code inside the branch. When everything looks good, commit/push.
(5) Now, navigate to the branch you want to merge into with "git checkout <branch-to-merge-into>"
	Note: This will usually be master - "git checkout master"
(6) Now merge with "git merge <name-of-new-branch>"
	Note: Hopefully, its a "Fastfoward" with no conflicts. If there's a conflict, that'll have to be dealt with.
	Here a Link: https://www.git-tower.com/learn/git/ebook/en/command-line/advanced-topics/merge-conflicts/
(6.A) In the event of conflict BEFORE merging. If unsure how to resolve a conflict, use "git merge --abort".
	This will basically undo the merge attempt.
(6.B) In the event issues that arise AFTER merging. If you "resolve" a conflict, but then find it wasn't
	done quite right use this command: "git reset --hard".
	This will rewind the version of the branch you merged into to its laster working commit.
(7) Before pushing, be sure that everthing looks good and works as expected.
(8) After pushing the newly merged branch, delete the branch you were working on with "git branch -d <name-of-new-branch>". Friendky note: Be sure this isn't the name of the branch you merged into.

Dealing with Conflicts:

Whenever there's a confict, a new file with a mashed together version of the differeing code that belongs to the "worked on branch" and the "branch to be merged into" will be created. On this file, you have delete the changes you don't want and get rid of any conflict indicators (e.g. ">>>", "===", and <<<") that will prevent the code from compiling as usual. When everything looks good, you can go ahead and add/commit the file(s). Here's a youtube link that might be helpful: https://www.youtube.com/watch?v=XX-Kct0PfFc

Final Notes:
Feel free to correct and/or add onto these git instructions/advice! 

United Coders GitHub Contributors (Enter Name Here):
Sidney Jackson
Cheryl Limer

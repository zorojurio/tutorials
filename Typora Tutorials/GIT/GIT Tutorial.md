## git GIT

```
git --version
```

## configuring GIT

1. System - All users
2. GLobal- All repos of the current  user //
3. Local - current repo

```
git config --global user.name "urName"   
git config --global user.email uremail@gmail.com
```

## Configure VS code as the Default Editor in GIT

```
git config --global core.editor "code --wait"
```

## editing all the configurations in VS Code

```bash
git config --global -e 
# now u ll have to wait

```

.gitconfig File will be configured here

```json
[user]
	email = zorojurio@gmail.com
	name = Zorojurio
[credential]
	helper = wincred
[core]
	editor = code --wait

```

## End of Lines

### Carriage Return -CR  - Windows OS uses this

On computers, adding a **carriage return** means pressing the "Enter" key to add a hard line break so your cursor **returns** to the left margin to start a new paragraph

CRLF- Carriage Return Line Feed

![image-20201024085710434](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024085710434.png)



Windows - if True: GIT removes the CR when pushing to GIT

MAC -If True : If the user accidentally press "Enter" When pushing it will be removed

```
git config --global core.autocrlf true
```

## Getting the help from the Terminal

```
git config --help
git config -h
```

## Initializing a repository

```
git init 
```

.git sub directory will be created. 



## staging Area, Index

proposal for the next commit

```python
git add file1, file2
git add file1.js 			# Stages a single file
git add file1.js file2.js	 # Stages multiple files
git add *.js 				# Stages with a pattern
git add . 					# Stages the current directory and all its content 
```



## Viewing the status 

```python
git status 		# Full status
git status -s 	# Short status
```



## commit - approve stages

```python
git commit -m "Message" 	 # Commits with a one-line message
git commit 					# Opens the default editor to type a long message 

```



![image-20201024142224120](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024142224120.png)

![image-20201024135047833](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024135047833.png)



once  a commit is done staging area will become empty.



## BUG in file1

![image-20201024135458482](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024135458482.png)



![image-20201024135508507](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024135508507.png)

## 

## Delete File2 - it is reused Code.

First we have deleted it from our workspace. in order to delete it from the GIT we use 

```
git add file2
```

![image-20201024135647003](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024135647003.png)

![image-20201024135750936](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024135750936.png)



## each commit generates a ID.  has complete snapshot of the project



![image-20201024140331028](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024140331028.png)



## Best Practices for committing

1. Commit should not be too big nor too small 

2. must represent logically represent change state/ state by state u do commits

   1. when fixing a bug , u find type  u should do two commits 
      1. BUG
      2. TYPO

3. Make it meaningful 

4. use past tense

   

## Skipping Staging Area

```
git commit -am "Message" 
```

## Remove Files

### Normal Method

![image-20201024155031607](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024155031607.png)

After deleting only it will be  removed from the staging area	

![image-20201024155454142](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201024155454142.png)

## GIT method Remove files

```python
git rm -f file1.js 		# Removes from working directory and staging area
git rm --cached file1.js # Removes from staging area only 
```

## removing and renaming

```python
 mv file1.txt main.js
 git add file1.txt # remove the file from stage
 git add main.js   # adding the file to the stage
    
 # short cut
git mv file1.txt main.js # 
```

## Git status

```python
git status -s

# A Green added to the staging area
# M Red modified the file
# ?? REd newly created file
# AM A green M red, A  + M (after adding same file was modified)
```

## Viewing the staged/unstaged changes 

```python
git diff # Shows unstaged changes
git diff --staged # Shows staged changes
git diff --cached # Same as the above 
```

## Graphical Tools

```python
git config --global diff.tool vscode # for all repos vscode will be used as the Graphical interface
git config --global difftool.vscode.cmd "code --wait --diff $LOCAL $REMOTE" 
git config --global -e  # edit  global settings in ur default editor

[user]
	email = zorojurio@gmail.com
	name = Zorojurio
[credential]
	helper = wincred
[core]
	editor = code --wait
	autocrlf = true
[diff]
	tool = vscode
[difftool "vscode"]
	cmd = code --wait --diff "$LOCAL" "$REMOTE"

```

## LOG

Trunck = Head 

HEAD is a referrence to the current branch

```
git log
git log --oneline
git log --oneline -reverse

```

## Viewing a Commit

```python
git show commit_id
git show HEAD #  show the current commit
git show HEAD~ / git show HEAD~1  # show the second lastet
git show HEAD~2  
```

## Getting the content of a File of a particular commit

```
git show HEAD~2:.gitignore # dispay all the lines of the file 
```

## Getting the tree

```python
git ls-tree HEAD

100644 blob 45a20f303c45dc81fd616a60202e408538cef95d    .gitignore # blob is a file
040000 tree 8173c8a815f5aa511fa6bfe39d7cbc81cbccab5b    chandi # tree is a dir
100644 blob 0722b092f28b4e9f58076785696f3ce710b4753f    file.txt
100644 blob 8afdf24febf7b3f6bfbd3446d9147dcc57ccf2eb    main.js
```

![image-20201026105411688](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201026105411688.png)

## Unstaging Files / restore

here git getting a copy from the latest commit and put it in the staging area

```
git restore --staged file.js # only the file.js will be removed from the staging area
git restore --staged .    # all the files in the staging area will be affected

```

## Discarding local changes

```python
git restore file.js # Copies file.js from index to working directory
git restore file1.js file2.js # Restores multiple files in working directory
git restore . # Discards all local changes (except untracked files)
git clean -fd # Removes all untracked files / dirs
git clean -f # only the files will be deleted here
git clean -d # only the empty dirs will be deleted

```

## Restore a file to an earlier stages

```python
git restore --source=HEAD~1 file.js # restore only file.js from the previous commit
git restore --source=HEAD~1 .   # restore all the files of the previous commit
```


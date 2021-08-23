// This command will check if `.gitignore` exists, and ensure that git isn't
// tracking `node_modules`. If both of the above are true, the deploy will
// proceed. If `.gitingore` is missing or `node_modules` is tracked, it will
// exit with a message telling them to seek adult supervision
const checkGitIgnore = `
 if !(git ls-files --error-unmatch node_modules) && [ -f .gitignore ];
   then true;
   else printf "\n\nWARNING: .gitignore is wrong or missing.
   Ask an instructor for assistance!\n\n" && false; fi
`

const ghPagesList = [
  'index.html',
  'favicon.ico',
  'public'
].join(' ')

module.exports = {
  'check-gitignore': {
    command: checkGitIgnore
  },
  'git-rename-master-to-main': {
    // if we have a master branch (git branch | grep master)
    // and don't have a main branch. (git branch | (! grep main))
    // Then rename the master branch to main
    // No matter what, return  `true` so the deployment can continue
    command: '((git branch | grep master) && (git branch | (! grep main)) && git branch -m master main) || true'
  },
  'git-is-clean': {
    // `git status --porcelain` will evaluate to the empty string if the
    // working directory is clean.
    // `test -z` will exit 0 (true) if its argument is an empty string.
    // If it doesn't exit true, `(git status && false)` will show why the
    // repository isn't clean and exit false causing the grunt tasks to end.

    // WARNING: The shell we are using doesn't seem to support executing commands
    // with `$()` or backticks. So instead we are using xargs. See here: https://askubuntu.com/a/1164550
    command: 'git status --porcelain | xargs -I % test -z % || (git status && false)'
  },
  'git-push-main': {
    // if the push to main fails, we want to delete any files that were created
    // by the build process and exit all remaining build steps
    command: 'git push origin main || (git clean -f && false)'
  },
  'git-checkout-main': {
    command: 'git checkout main'
  },
  'deploy-prepare': {
    command: [
      '(git branch -D gh-pages || echo "so not removed")',
      'git checkout --orphan gh-pages',
      // || true: Allows this command to pass, since it will fail to delete ignored files
      '(git rm -rf --cached * || true)'
    ].join(' && ')
  },
  'deploy-publish': {
    command: [
      'touch .nojekyll',
      `git add --force .nojekyll ${ghPagesList}`,
      // If we already committed before we still want to continue deploying
      '(git commit -m "deploy task" || true)',
      'git push origin gh-pages --force',
      'git clean -x -d --force --exclude=node_modules',
      'git checkout main'
    ].join(' && ')
  }
}

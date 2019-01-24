import * as fs from 'fs';
import * as path from 'path';
const spawn = require('cross-spawn');

const compiledDirRoot = 'test/out';
const expectedDirRoot = 'test/fixtures';

describe(`Compile 'github' flavoured markdown`, () => {
    spawn.sync(
        'typedoc',
        [
            './test/src',
            '--out',
            './test/out/github',
            '--theme',
            'markdown',
            '--gitRevision',
            'master',
            '--media',
            'test/src/media/',
            '--includes',
            'test/src/inc/',
        ],
        {
            stdio: 'inherit',
        },
    );
    //  compareOutputToMocks('github');
});

describe(`Compile 'githubWiki' flavoured markdown`, () => {
    spawn.sync(
        'typedoc',
        [
            './test/src',
            '--out',
            './test/out/typedoc-wiki-test.wiki',
            '--theme',
            'markdown',
            '--disableOutputCheck',
            '--mdEngine',
            'githubWiki',
            '--gitRevision',
            'master',
            '--media',
            'test/src/media/',
            '--includes',
            'test/src/inc/',
        ],

        {
            stdio: 'inherit',
        },
    );
    // compareOutputToMocks('github');
});

describe(`Compile 'html'`, () => {
    spawn.sync(
        'typedoc',
        [
            './test/src',

            '--out',
            './test/out/html',

            '--disableOutputCheck',

            '--gitRevision',
            'master',
            '--media',
            'test/src/media/',
            '--includes',
            'test/src/inc/',
        ],

        {
            stdio: 'inherit',
        },
    );
});
/*
describe(`Compile 'bitbucket' flavoured markdown`, () => {
    spawnSync(
        'typedoc',
        [
            './test/src',
            '--out',
            './test/out/bitbucket',
            '--theme',
            'markdown',
            '--gitRevision',
            'master',
            '--mdEngine',
            'bitbucket',
            '--media',
            'test/src/media/',
            '--includes',
            'test/src/inc/',
            '--excludePrivate',
            '--readme',
            'none',
            '--mode',
            'file',
            '--mdSourceRepo',
            'https://bitbucket.org/owner/repository_name',
        ],
        {
            stdio: 'inherit',
        },
    );
    compareOutputToMocks('bitbucket');
});

describe(`Compile 'gitbook' flavoured markdown`, () => {
    spawnSync(
        'typedoc',
        [
            './test/src',
            '--out',
            './test/out/gitbook',
            '--theme',
            'markdown',
            '--gitRevision',
            'master',
            '--mdEngine',
            'gitbook',
            '--media',
            'test/src/media/',
            '--includes',
            'test/src/inc/',
        ],
        {
            stdio: 'inherit',
        },
    );
    compareOutputToMocks('gitbook');
    test('should compile summary', () => {
        expectFileToEqualMock('SUMMARY.md', 'gitbook');
    });
});
*/

function compareOutputToMocks(flavour) {
    test('should compile home', (done) => {
        expectFileToEqualMock('README.md', flavour);
        done();
    });

    test('should compile modules', () => {
        expectOutputFilesToEqualMocks('modules', flavour);
    });

    test('should compile classes', () => {
        expectOutputFilesToEqualMocks('classes', flavour);
    });

    test('should compile interfaces', () => {
        expectOutputFilesToEqualMocks('interfaces', flavour);
    });

    test('should compile enums', () => {
        expectOutputFilesToEqualMocks('enums', flavour);
    });
}

function expectFileToEqualMock(fileName, testNum) {
    const md1 = fs.readFileSync(
        `${compiledDirRoot}/${testNum}/${fileName}`,
        'utf-8',
    );
    const md2 = fs.readFileSync(
        path.join(__dirname, '..', `${expectedDirRoot}/${testNum}/${fileName}`),
        'utf-8',
    );

    expect(md1).toEqual(md2);
}

function expectOutputFilesToEqualMocks(ref, testNum) {
    const files = fs.readdirSync(
        path.join(__dirname, '..', `${expectedDirRoot}/${testNum}/${ref}`),
    );
    files.forEach((filename) => {
        if (!/^\..*/.test(filename)) {
            expectFileToEqualMock(`${ref}/${filename}`, testNum);
        }
    });
}

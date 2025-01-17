/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import Fs from 'fs';
import { promisify } from 'util';
import path from 'path';

import del from 'del';

import { download } from './download';
import { cleanPrevious, cleanArtifacts } from './cleanup';
import { extract, getPackData } from './pack';
import { renamePlugin } from './rename';
import { existingInstall, assertVersion } from './opensearch_dashboards';
import { kebabCase } from 'lodash';

const mkdir = promisify(Fs.mkdir);

export async function install(settings, logger) {
  try {
    await cleanPrevious(settings, logger);

    await mkdir(settings.workingPath, { recursive: true });

    await download(settings, logger);

    await getPackData(settings, logger);

    await extract(settings, logger);

    del.sync(settings.tempArchiveFile, { force: true });

    existingInstall(settings, logger);

    assertVersion(settings);

    const targetDir = path.join(settings.pluginDir, kebabCase(settings.plugins[0].id));
    await renamePlugin(settings.workingPath, targetDir);

    logger.log('Plugin installation complete');
  } catch (err) {
    logger.error(`Plugin installation was unsuccessful due to error "${err.message}"`);
    cleanArtifacts(settings);
    process.exit(70);
  }
}

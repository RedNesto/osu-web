<?php

/**
 *    Copyright 2015-2017 ppy Pty. Ltd.
 *
 *    This file is part of osu!web. osu!web is distributed with the hope of
 *    attracting more community contributions to the core ecosystem of osu!.
 *
 *    osu!web is free software: you can redistribute it and/or modify
 *    it under the terms of the Affero GNU General Public License version 3
 *    as published by the Free Software Foundation.
 *
 *    osu!web is distributed WITHOUT ANY WARRANTY; without even the implied
 *    warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *    See the GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with osu!web.  If not, see <http://www.gnu.org/licenses/>.
 */

return [
    'header' => [
        'title' => '状态',
        'description' => 'whats going on mah dude?',
    ],

    'incidents' => [
        'title' => 'Active Incidents',
        'automated' => 'automated',
    ],

    'online' => [
        'title' => [
            'users' => 'Online Users in the last 24 Hours',
            'score' => 'Score Submissions in the last 24 Hours',
        ],
        'current' => '当前在线用户',
        'score' => '每秒提交得分量',
    ],

    'recent' => [
        'incidents' => [
            'title' => 'Recent Incidents',
            'state' => [
                'resolved' => 'Resolved',
                'resolving' => 'Resolving',
                'unknown' => 'Unknown',
            ],
        ],

        'uptime' => [
            'title' => 'Uptime',
            'graphs' => [
                'server' => 'server',
                'web' => 'web',
            ],
        ],

        'when' => [
            'today' => 'today',
            'week' => 'week',
            'month' => 'month',
            'all_time' => 'all time',
            'last_week' => '上周',
            'weeks_ago' => ':count 周前',
        ],
    ],
];

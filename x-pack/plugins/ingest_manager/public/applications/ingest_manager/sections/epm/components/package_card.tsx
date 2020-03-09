/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React from 'react';
import styled from 'styled-components';
import { EuiCard } from '@elastic/eui';
import { PackageInfo, PackageListItem } from '../../../types';
import { useLinks } from '../hooks';
import { PackageIcon } from './package_icon';

export interface BadgeProps {
  showInstalledBadge?: boolean;
}

type PackageCardProps = (PackageListItem | PackageInfo) & BadgeProps;

// adding the `href` causes EuiCard to use a `a` instead of a `button`
// `a` tags use `euiLinkColor` which results in blueish Badge text
const Card = styled(EuiCard)`
  color: inherit;
`;

export function PackageCard({
  description,
  name,
  title,
  version,
  showInstalledBadge,
  status,
}: PackageCardProps) {
  const { toDetailView } = useLinks();
  const url = toDetailView({ name, version });

  return (
    <Card
      betaBadgeLabel={showInstalledBadge && status === 'installed' ? 'Installed' : ''}
      layout="horizontal"
      title={title || ''}
      description={description}
      icon={<PackageIcon packageName={name} size="l" />}
      href={url}
    />
  );
}

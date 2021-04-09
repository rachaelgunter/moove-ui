import React, { FC } from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { Segment } from '../types';
import { BIG_QUERY_PREVIEW_SEGMENT_QUERY } from '../queries';

interface PreviewSegmentTabWrapperProps {
  selectedTab: number;
  segmentId: string;
  children: (
    selectedTab: number,
    data: Segment | undefined,
    error: ApolloError | undefined,
    loading: boolean,
  ) => React.ReactNode;
}
const PreviewSegmentDataLoader: FC<PreviewSegmentTabWrapperProps> = ({
  selectedTab,
  segmentId,
  children,
}: PreviewSegmentTabWrapperProps) => {
  const { data, error, loading } = useQuery<Segment>(
    BIG_QUERY_PREVIEW_SEGMENT_QUERY,
    {
      variables: {
        segmentId,
      },
    },
  );

  return <>{children(selectedTab, data, error, loading)}</>;
};

export default PreviewSegmentDataLoader;

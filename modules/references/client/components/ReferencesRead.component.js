import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReferencesReadPresentational from './read-references/ReferencesReadPresentational';
import * as referencesApi from '../api/references.api';
import Loading from '@/modules/core/client/components/Loading';

const api = { references: referencesApi };

/**
 * This is a container component for a list of user's References
 */
export default function ReferencesRead({ user }) {
  const [references, setReferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // load references from api
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const references = await api.references.read({
        userTo: user._id,
      });

      setReferences(references);
      setIsLoading(false);
    })();
  }, [user]);

  if (isLoading) return <Loading />;

  const publicReferences = references
    .filter(reference => reference.public)
    .sort((a, b) => a.created < b.created);
  const nonpublicReferences = references
    .filter(reference => !reference.public)
    .sort((a, b) => a.created > b.created);

  return (
    <ReferencesReadPresentational
      user={user}
      publicReferences={publicReferences}
      nonpublicReferences={nonpublicReferences}
    />
  );
}

ReferencesRead.propTypes = {
  user: PropTypes.object.isRequired,
};

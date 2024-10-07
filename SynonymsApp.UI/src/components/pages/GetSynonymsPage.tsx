import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Layout from '../shared/Layout.tsx';
import Loader from '../shared/Loader.tsx';
import useDebounce from '../../hooks/useDebounce.ts';
import getSynonyms from '../../api/getSynonyms.ts';
import useGlobalNotification from '../../hooks/useGlobalNotification.ts';

function GetSynonymsPage () {
  const [synonymsQueryTerm, setSynonymsQueryTerm] = useState('');
  const [applyTransitiveRule, setApplyTransitiveRule] = useState(true);
  const debouncedSynonymsQueryTerm = useDebounce(synonymsQueryTerm, 400);

  const { setNotification, removeNotification } = useGlobalNotification();

  const { isLoading, data, error } = useQuery<{ synonyms: string[]}>({
    queryKey: ['synonyms', debouncedSynonymsQueryTerm, applyTransitiveRule],
    queryFn: async ({ signal }) => { 
      removeNotification();
      return getSynonyms(debouncedSynonymsQueryTerm, applyTransitiveRule, signal)
    },
    enabled: !!debouncedSynonymsQueryTerm && /^[a-z0-9]+$/.test(debouncedSynonymsQueryTerm)
  });

  useEffect(() => {
    if (error) {
      setNotification('error', 'Error', error.message);
    }
  }, [error, setNotification]);

  return  <Layout>
            <div className='bg-white flex flex-col w-11/12 max-w-lg h-7 mb-5'>
                {data && data.synonyms.length > 0 && <span className='text-sm font-semibold leading-6 text-gray-500'>Synonyms for "{debouncedSynonymsQueryTerm}" are: {data?.synonyms.join(', ')}</span>}
                {data && data.synonyms.length === 0 && <span className='text-sm font-semibold leading-6 text-gray-500'>Word "{debouncedSynonymsQueryTerm}" does not have any synonyms.</span>}
            </div>
            <div className="bg-white shadow-lg rounded-md p-1 md:p-10 flex flex-col w-11/12 max-w-lg h-[240px]">
              <label htmlFor="word" className="mb-5 h-[120px]">
                {isLoading && <div className='flex flex-row items-center'><Loader /><span className='ml-2'>Searching for synonyms...</span></div>}
                {!isLoading && <div className='flex flex-row items-center'><span>Type a word to search for synonyms</span></div>}
                <input
                  autoFocus
                  type="text"
                  name="word"
                  id="word"
                  value={synonymsQueryTerm}
                  onChange={(e) => setSynonymsQueryTerm(e.target.value)}
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown)]:border-red-500 peer placeholder:italic"
                  placeholder="e.g. clean"
                  pattern="[a-z0-9]+"
                  required
                />
                <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):invalid]:block">
                  Please enter a valid word consisting only from letters and numbers
                </span>
              </label>
              <div className="flex">
                  <div className="flex items-center h-5">
                      <input
                        id="checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        checked={applyTransitiveRule}
                        onChange={(e) => setApplyTransitiveRule(e.target.checked)}
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                  </div>
                  <div className="ms-2 text-sm">
                      <label htmlFor="checkbox" className="font-medium text-gray-900 dark:text-gray-300">Apply transitive rule</label>
                      <p id="checkbox-help" className="text-xs font-normal text-gray-500 dark:text-gray-300 italic">e.g. if "B" is a synonym to "A" and "C" a synonym to "B" then, by transitive rule, "C" is also synonym to "A"</p>
                  </div>
              </div>
            </div>
          </Layout>;
}

export default GetSynonymsPage;
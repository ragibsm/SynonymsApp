import { useForm, SubmitHandler } from "react-hook-form"

import Layout from '../shared/Layout.tsx';
import { useMutation } from '@tanstack/react-query';
import Loader from '../shared/Loader.tsx';
import useGlobalNotification from '../../hooks/useGlobalNotification.ts';
import { useEffect } from 'react';
import createSynonyms from '../../api/createSynonyms.ts';

interface IFormInput {
  word: string;
  synonyms: string;
}

function CreateSynonymsPage() {

  const { setNotification } = useGlobalNotification();

  const { register, handleSubmit, formState, reset } = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      word: '',
      synonyms: ''
    }
  });

  const { mutate, isPending: isMutationPending , error: mutationError } = useMutation({
    mutationFn: async (data: { word: string; synonyms: string[]; }) => {
      await createSynonyms(data);
      reset();
      setNotification('success', 'Success', 'Synonyms successfully created!');
    }
  });

  const { isValid, errors } = formState;

  useEffect(() => {
    if (mutationError) {
      setNotification('error', 'Error', mutationError.message);
    }
  }, [mutationError, setNotification]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => mutate({ word: data.word, synonyms: data.synonyms.split(',').map(x => x.trim()) })

  return  <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col max-w-lg group">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Create new synonyms</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Enter a word with comma separated list of synonyms and click Save.</p>
                <div className="col-span-full max-w-100 my-5 h-[100px]">
                  <label htmlFor="word" className="block text-sm font-medium leading-6 text-gray-900">
                    Word
                  </label>
                  <input
                    disabled={isMutationPending}
                    id="word"
                    type="text"
                    {...register("word", { pattern: /^[a-z0-9]+$/i, required: true })}
                    placeholder="e.g. clean"
                    className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 placeholder:italic ${errors?.word ? 'border-red-500' : ''}`}
                  />
                  {errors?.word && <span className="text-sm text-red-500">
                    Please enter a valid word consisting only from letters and numbers
                  </span>}
                </div>

                <div className="col-span-full max-w-100 h-[200px]">
                  <label htmlFor="synonyms" className="block text-sm font-medium leading-6 text-gray-900">
                    Synonyms
                  </label>
                  <textarea
                      disabled={isMutationPending}
                      id="synonyms"
                      {...register("synonyms", { pattern: /^([a-z0-9]+)(\s*,\s*[a-z0-9]+)*$/i, required: true })}
                      rows={5}
                      className={`w-full max-w-100 max-h-[126px] rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown)]:border-red-500 placeholder:italic ${errors?.synonyms ? 'border-red-500' : ''}`}
                      placeholder='e.g. tidy, pure'
                    />
                  {errors?.synonyms && <span className="text-sm text-red-500 inline-block text-wrap">
                    Please enter a comma separated list of valid synonyms. Every synonym should consist of only letters and numbers
                  </span>}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-8">
                <button
                  disabled={!isValid || isMutationPending}
                  type="submit"
                  className="w-1/3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-200 disabled:text-gray-500"
                >
                  {isMutationPending ? <div className='flex flex-row items-center'><Loader /><span className='ml-2'>Processing...</span></div> : 'Save'}
                </button>
              </div>
            </form>
          </Layout>
}

export default CreateSynonymsPage;
import ensureTense from '../library/ensure-tense';

export default (parsed, when, value) => {
	const negated = when === 'never';
	const {matches, offending} = ensureTense(parsed.body, value);
	const offenders = offending
		.map(item => [item.lemma, item.tense].join(' - '))
		.join(',');

	return [
		negated ? !matches : matches,
		[
			`tense of body must`,
			negated ? `not` : null,
			`be ${value}. Verbs in other tenses: ${offenders}`
		]
		.filter(Boolean)
		.join(' ')
	];
};

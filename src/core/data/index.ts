interface IData {
  level: number;
  taskTitle: string;
  task: string;
  answer: string[];
  title: string;
  subtitle: string;
  syntax: string;
  hint: string;
  examples: string[];
}

class Data {
  readonly data: IData[];

  constructor() {
    this.data = [
      {
        level: 1,
        taskTitle: 'Select the plates',
        task: `
        <plate/>
        <plate/>
        `,
        answer: ['plate'],
        title: 'Type Selector',
        subtitle: 'Select elements by their type',
        syntax: 'A',
        hint:
          'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
          '<strong>div</strong> selects all <tag>div</tag> elements.',
          '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
      },
      {
        level: 2,
        taskTitle: 'Select the bento boxes',
        task: `
        <bento/>
        <plate/>
        <bento/>`,
        answer: ['bento'],
        title: 'Type Selector',
        subtitle: 'Select elements by their type',
        syntax: 'A',
        hint:
          'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
          '<strong>div</strong> selects all <tag>div</tag> elements.',
          '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
      },
      {
        level: 3,
        taskTitle: 'Select the fancy plate',
        task: `
        <plate id="fancy"/>
        <plate/>
        <bento/>
        `,
        answer: ['#fancy'],
        title: 'Descendant Selector',
        subtitle: 'Select an element inside another element',
        syntax: 'A  B',
        hint:
          'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
        examples: [
          '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
          '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
        ],
      },
      {
        level: 4,
        taskTitle: 'Select the apple on the plate',
        task: `
        <bento/>
        <plate>
          <apple/>
        </plate>
        <apple/>
        `,
        answer: ['plate apple'],
        title: 'Descendant Selector',
        subtitle: 'Select an element inside another element',
        syntax: 'A  B',
        hint:
          'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
        examples: [
          '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
          '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
        ],
      },
      {
        level: 5,
        taskTitle: 'Select the pickle on the fancy plate',
        task: `
        <bento>
        <orange/>
        </bento>
        <plate id="fancy">
          <pickle/>
        </plate>
        <plate>
          <pickle/>
        </plate>
        `,
        answer: ['#fancy pickle'],
        title: '',
        subtitle: 'Combine the Descendant & ID Selectors',
        syntax: '#id  A',
        hint: 'You can combine any selector with the descendent selector.',
        examples: [
          '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
        ],
      },
      {
        level: 6,
        taskTitle: 'Select the small apples',
        task: `
        <apple/>
        <apple class="small"/>
        <plate>
          <apple class="small"/>
        </plate>
        <plate/>
        `,
        answer: ['.small'],
        title: 'Class Selector',
        subtitle: 'Select elements by their class',
        syntax: '.classname',
        hint:
          'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
        examples: ['<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'],
      },
      {
        level: 7,
        taskTitle: 'Select the small oranges',
        task: `
        <apple/>
        <apple class="small"/>
        <bento>
          <orange class="small"/>
        </bento>
        <plate>
          <orange/>
        </plate>
        <plate>
          <orange class="small"/>
        </plate>`,
        answer: ['orange.small'],
        title: '',
        subtitle: 'Combine the Class Selector',
        syntax: 'A.className',
        hint: 'You can combine the class selector with other selectors, like the type selector.',
        examples: [
          '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
          '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
        ],
      },
      {
        level: 8,
        taskTitle: 'Select the small oranges in the bentos',
        task: `
        <bento>
          <orange/>
        </bento>
        <orange class="small"/>
        <bento>
          <orange class="small"/>
        </bento>
        <bento>
          <apple class="small"/>
        </bento>
        <bento>
          <orange class="small"/>
        </bento>
        `,
        answer: ['bento orange.small'],
        title: '',
        subtitle: 'You can do it...',
        syntax: 'Put your back into it!',
        hint: 'Combine what you learned in the last few levels to solve this one!',
        examples: [],
      },
      {
        level: 9,
        taskTitle: 'Select all the plates and bentos',
        task: `
        <pickle class="small"/>
        <pickle/>
        <plate>
          <pickle/>
        </plate>
        <bento>
          <pickle/>
        </bento>
        <plate>
          <pickle/>
        </plate>
        <pickle/>
        <pickle class="small"/>
        `,
        answer: ['plate,bento'],
        title: 'Comma Combinator',
        subtitle: 'Combine, selectors, with... commas!',
        syntax: 'A, B',
        hint:
          'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
        examples: [
          '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
          '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements',
        ],
      },
      {
        level: 10,
        taskTitle: 'Select all the things!',
        task: `
        <apple/>
        <plate>
          <orange class="small" />
        </plate>
        <bento/>
        <bento>
          <orange/>
        </bento>
        <plate id="fancy"/>
        `,
        answer: ['*'],
        title: 'The Universal Selector',
        subtitle: 'You can select everything!',
        syntax: '*',
        hint: 'You can select all elements with the universal selector!',
        examples: ['<strong>p *</strong> selects any element inside all <tag>p</tag> elements.'],
      },
      {
        level: 11,
        taskTitle: 'Select the first pickle',
        task: `
        <plate/>
        <pickle/>
        <plate/>
        <pickle/>
        `,
        answer: ['pickle:first-of-type', 'pickle:first-child'],
        title: 'Pseudo-class',
        subtitle: 'Select first pickle',
        syntax: ':first-of-type',
        hint: '',
        examples: ['<strong>plate: first-of-type</strong> selects the first plate.'],
      },
      {
        level: 12,
        taskTitle: 'Select the second and the third apples',
        task: `
        <plate/>
        <apple/>
        <plate>
        <apple/>
        </apple>
        </plate>
        <orange/>
        <apple/>`,
        answer: ['apple:last-child', 'apple:last-of-type'],
        title: 'Pseudo-class',
        subtitle: '',
        syntax: ':last-child',
        hint: '',
        examples: ['<strong>div: last-child</strong> selects all <tag>div</tag>, which are last child elements.'],
      },
      {
        level: 13,
        taskTitle: 'Select the orange on the plate',
        task: `
        <orange/>
        <orange/>
        <plate>
        <orange/>
        </plate>
        <orange/>
        `,
        answer: ['orange:only-child', 'plate orange', 'orange:only-of-type'],
        title: 'Pseudo-class',
        subtitle: '',
        syntax: ':only-child',
        hint: '',
        examples: ['<strong>div: only-child</strong> selects an element without any siblings.'],
      },
      {
        level: 14,
        taskTitle: 'Select items on the bentos',
        task: `
        <pickle/>
        <pickle/>
        <bento>
        <apple/>
        </bento>
        <bento>
          <pickle/>
        </bento>
        <apple/>
        <apple/>
        `,
        answer: [':only-of-type', 'bento:only-of-type'],
        title: 'Pseudo-class',
        subtitle: ':only-of-type',
        syntax: ':only-of-type',
        hint: '',
        examples: ['<strong>div: only-of-type</strong> selects an element that has no siblings of the same type.'],
      },
      {
        level: 15,
        taskTitle: 'Select the third orange and the third apple',
        task: `
        <apple/>
        <apple/>
        <orange/>
        <apple/>
        <orange/>
        <apple/>
        <orange/>
        <apple/>
        `,
        answer: [':nth-of-type(3)'],
        title: 'Pseudo-class',
        subtitle: '',
        syntax: ':nth-of-type(n)',
        hint: '',
        examples: [
          '<strong>div: nth-of-type(n)</strong> selects elements based on their position among siblings of the same type (tag name).',
        ],
      },
      {
        level: 16,
        taskTitle: 'Select all sour apples',
        task: `
        <apple taste="sweet"/>
        <apple taste="sour"/>
        <apple taste="sour"/>
        `,
        answer: ['* [taste="sour"]'],
        title: 'Universal selectors',
        subtitle: '',
        syntax: '* [att="value"]',
        hint: '',
        examples: [
          '<strong>* [lang="en"]</strong> selects all elements with attribute <strong>lang</strong> equal to <strong>en</strong>',
        ],
      },
      {
        level: 17,
        taskTitle: 'Select chocolates with the taste which name starts with "S"',
        task: `
        <chocolate taste="sweet"/>
        <chocolate taste="sour"/>
        <chocolate taste="bitter"/>
        <chocolate taste="saulty"/>`,
        answer: ['* [taste^="s"]'],
        title: 'Universal selectors',
        subtitle: '',
        syntax: '* [att^="value"]',
        hint: '',
        examples: [
          '<strong>* [lang^="en"]</strong> selects all elements with attribute <strong>lang</strong> which starts with <strong>en</strong>',
        ],
      },
      {
        level: 18,
        taskTitle: 'Select the apple only on the plate',
        task: `
        <bento>
          <plate>
            <apple/>
          </plate>
        </bento>
        <bento>
          <apple/>
        </bento>
        <apple/>
        `,
        answer: ['plate > apple'],
        title: 'Child combinator',
        subtitle: 'You can do it...',
        syntax: 'A > B',
        hint:
          'The child combinator <strong>></strong> is placed between two CSS selectors. It matches only those elements matched by the second selector that are the direct children of elements matched by the first.',
        examples: [],
      },
      {
        level: 19,
        taskTitle: 'Select all the chocolates to the right of pickle',
        task: `
        <chocolate/>
        <chocolate/>
        <pickle/>
        <chocolate/>
        <chocolate/>
        `,
        answer: ['pickle ~ chocolate'],
        title: 'General sibling combinator',
        subtitle: '',
        syntax: 'A ~ B',
        hint:
          'The general sibling combinator <strong>~</strong> separates two selectors and matches all iterations of the second element, that are following the first element (though not necessarily immediately), and are children of the same parent element.',
        examples: [],
      },
      {
        level: 20,
        taskTitle: 'Select everything on the plates!',
        task: `
        <plate>
          <apple/>
        </plate>
        </apple>
        <plate>
          <orange/>
        </plate>
        <apple/>
        <plate>
          <pickle/>
        </plate>
        `,
        answer: ['plate > *'],
        title: 'The Universal Selector',
        subtitle: 'You can select everything!',
        syntax: 'A > *',
        hint: 'You can select all elements with the universal selector!',
        examples: [''],
      },
    ];
  }

  getData(): IData[] {
    return this.data;
  }
}

export { Data, IData };

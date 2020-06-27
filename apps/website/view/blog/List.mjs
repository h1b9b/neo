import {default as BaseList} from '../../../../src/list/Base.mjs';
import BlogPosts             from '../../store/BlogPosts.mjs';

/**
 * @class Website.view.blog.List
 * @extends Neo.list.Base
 */
class List extends BaseList {
    static getConfig() {return {
        /**
         * @member {String} className='Website.view.blog.List'
         * @protected
         */
        className: 'Website.view.blog.List',
        /**
         * @member {String[]} cls=['website-blog-list','neo-list-container','neo-list']
         */
        cls: ['website-blog-list', 'neo-list-container', 'neo-list'],
        /**
         * @member {Neo.data.Store} store=BlogPosts
         */
        store: BlogPosts
    }}

    /**
     * @param {Object} record
     */
    createItemContent(record) {
        let me = this;

        const vdomCn = [{
            cls: ['content'],
            cn : [{
                cls  : ['neo-full-size', 'preview-image'],
                style: {
                    backgroundImage: `url('https://raw.githubusercontent.com/neomjs/pages/master/resources/website/blog/${record.image}')`
                }
            }, {
                cls: ['neo-relative'],
                cn : [{
                    cls: ['neo-absolute', 'neo-item-bottom-position'],
                    cn : [{
                        cls : ['neo-title'],
                        html: record.name.replace(/^(.{65}[^\s]*).*/, "$1")
                    }, {
                        cls: ['neo-top-20'],
                        cn : [{
                            tag: 'img',
                            cls: ['neo-user-image'],
                            src: `https://raw.githubusercontent.com/neomjs/pages/master/resources/website/blogAuthor/${record.authorImage}`
                        }, {
                            cls: ['neo-inner-content'],
                            cn : [{
                                cls : ['neo-inner-details'],
                                cn : [{
                                    cls : ['neo-bold'],
                                    tag : 'span',
                                    html: record.author
                                }, {
                                    vtype: 'text',
                                    html : ' in '
                                }, {
                                    cls : ['neo-bold'],
                                    tag : 'span',
                                    html: record.publisher
                                }]
                            }, {
                                cls : ['neo-inner-details'],
                                html: record.date
                            }]
                        }]
                    }]
                }]
            }]
        }];

        if (record.selectedInto.length > 0) {
            console.log(vdomCn[0].cn[1]);
            vdomCn[0].cn[1].cn.unshift({
                cls: ['neo-absolute', 'neo-item-top-position'],
                cn : [{
                    html: `Officially selected by ${record.provider} into`
                }, {
                    cls : ['neo-bold'],
                    html: record.selectedInto.join('</br>')
                }]
            });
        }

        return vdomCn;
    }
}

Neo.applyClassConfig(List);

export {List as default};
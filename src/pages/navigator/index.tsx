import { useState, useEffect } from 'react';
import { Input, Button, Typography, Card, Tag } from '@arco-design/web-react';
import { IconSearch, IconEye, IconHeart } from '@arco-design/web-react/icon';

import CampusCalander from './components/campuscalander';
import CompanyAlumni from './components/companyalumni';
import userStore from '@/store/User';
import { observer } from 'mobx-react-lite';
import { getSelfArticleListApi } from '@/service/article';
import { useQuery } from '@tanstack/react-query';
import { LifeContentTypeColor } from '@/types/article';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const hitokotos = [
  '悲观者永远正确 乐观者永远前行 ~ 🥰',
  '你当像鸟飞往你的山',
  '我的冲锋是堂吉柯德的冲锋，名为生活的大风车，我要与你大战300回合！',
  '用代码表达言语的魅力，用代码书写山河的壮丽',
  '他们朝我扔泥巴,我拿泥巴种荷花',
  '如果我们觉得我们已错过了春天，那么夏天、秋天和冬天里仍会有机会和时间',
  '除了脚下的路，没有别的路可以走，这条路以死亡为终点，也无法回头……我们尽力而为'
]



const Home: React.FC = observer(() => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const userInfo = userStore;
  const navigate = useNavigate();


  // 文章数据
  const articles = [
    {
      id: 1,
      title: '2024暑期实习面试全攻略：从简历到offer',
      excerpt: '详细介绍暑期实习申请的完整流程，包括简历优化、面试技巧、常见问题解答等实用内容...',
      author: '前端小李',
      avatar: '👨‍💻',
      publishTime: '2024-06-15',
      readTime: 8,
      views: 1234,
      likes: 89,
      comments: 23,
      tags: ['实习', '面试', '求职'],
      category: '求职指导',
      featured: true
    },
    {
      id: 2,
      title: 'React 18 新特性深度解析',
      excerpt: '全面介绍React 18的并发渲染、自动批处理、Suspense等新特性，帮助开发者快速上手...',
      author: 'React专家',
      avatar: '⚛️',
      publishTime: '2024-06-14',
      readTime: 12,
      views: 2156,
      likes: 156,
      comments: 45,
      tags: ['React', 'JavaScript', '前端'],
      category: '技术分享',
      featured: false
    },
    {
      id: 3,
      title: '字节跳动秋招技术岗位解析',
      excerpt: '深入分析字节跳动秋招的技术岗位要求、面试流程、薪资待遇等关键信息...',
      author: '字节员工',
      avatar: '🏢',
      publishTime: '2024-06-13',
      readTime: 6,
      views: 3421,
      likes: 234,
      comments: 67,
      tags: ['秋招', '字节跳动', '技术岗'],
      category: '企业分析',
      featured: true
    },
    {
      id: 4,
      title: 'TypeScript 高级类型系统实战',
      excerpt: '从实际项目出发，深入讲解TypeScript的高级类型系统，提升代码质量和开发效率...',
      author: 'TS大师',
      avatar: '📝',
      publishTime: '2024-06-12',
      readTime: 15,
      views: 1876,
      likes: 123,
      comments: 34,
      tags: ['TypeScript', '类型系统', '编程'],
      category: '技术分享',
      featured: false
    },
    {
      id: 5,
      title: '春招失败经验总结与秋招准备',
      excerpt: '分享春招失败的教训和反思，以及如何更好地准备秋招，避免重蹈覆辙...',
      author: '求职者小王',
      avatar: '👤',
      publishTime: '2024-06-11',
      readTime: 10,
      views: 987,
      likes: 67,
      comments: 28,
      tags: ['春招', '秋招', '经验分享'],
      category: '求职心得',
      featured: false
    },
    {
      id: 1,
      title: '2024暑期实习面试全攻略：从简历到offer',
      excerpt: '详细介绍暑期实习申请的完整流程，包括简历优化、面试技巧、常见问题解答等实用内容...',
      author: '前端小李',
      avatar: '👨‍💻',
      publishTime: '2024-06-15',
      readTime: 8,
      views: 1234,
      likes: 89,
      comments: 23,
      tags: ['实习', '面试', '求职'],
      category: '求职指导',
      featured: true
    },
    {
      id: 2,
      title: 'React 18 新特性深度解析',
      excerpt: '全面介绍React 18的并发渲染、自动批处理、Suspense等新特性，帮助开发者快速上手...',
      author: 'React专家',
      avatar: '⚛️',
      publishTime: '2024-06-14',
      readTime: 12,
      views: 2156,
      likes: 156,
      comments: 45,
      tags: ['React', 'JavaScript', '前端'],
      category: '技术分享',
      featured: false
    },
    {
      id: 3,
      title: '字节跳动秋招技术岗位解析',
      excerpt: '深入分析字节跳动秋招的技术岗位要求、面试流程、薪资待遇等关键信息...',
      author: '字节员工',
      avatar: '🏢',
      publishTime: '2024-06-13',
      readTime: 6,
      views: 3421,
      likes: 234,
      comments: 67,
      tags: ['秋招', '字节跳动', '技术岗'],
      category: '企业分析',
      featured: true
    },
    {
      id: 4,
      title: 'TypeScript 高级类型系统实战',
      excerpt: '从实际项目出发，深入讲解TypeScript的高级类型系统，提升代码质量和开发效率...',
      author: 'TS大师',
      avatar: '📝',
      publishTime: '2024-06-12',
      readTime: 15,
      views: 1876,
      likes: 123,
      comments: 34,
      tags: ['TypeScript', '类型系统', '编程'],
      category: '技术分享',
      featured: false
    },
    {
      id: 5,
      title: '春招失败经验总结与秋招准备',
      excerpt: '分享春招失败的教训和反思，以及如何更好地准备秋招，避免重蹈覆辙...',
      author: '求职者小王',
      avatar: '👤',
      publishTime: '2024-06-11',
      readTime: 10,
      views: 987,
      likes: 67,
      comments: 28,
      tags: ['春招', '秋招', '经验分享'],
      category: '求职心得',
      featured: false
    }
  ];

  // 搜索文章
  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (!value.trim()) {
      setFilteredArticles(articles);
      return;
    }

    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(value.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(value.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase())) ||
      article.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  // 初始化显示所有文章
  useEffect(() => {
    setFilteredArticles(articles);
    if (!userInfo.hitokoto || userInfo.hitokoto === "") {
      userInfo.hitokoto = hitokotos[Math.floor(Math.random() * hitokotos.length)]
    }
  }, []);

  const { data: selfArticles } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getSelfArticleListApi().then(res => res.data.data),
  });

  const handleArticleClick = (articleId: number) => {
    navigate(`/navigator/articles/detail?id=${articleId}`);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex flex-col px-6 py-2">
          <div className="flex items-center justify-between w-full">
            <div className="text-2xl font-bold">{userInfo.username || 'Aigei'}</div>
            <Button type="primary" size="small" className="ml-2" onClick={() => navigate('/navigator/articles/edit')}>发布文章</Button>
          </div>
          <Text className="text-gray-500 text-sm">{userInfo.hitokoto}</Text>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">


          {/* 左侧文章列表 */}
          <div className="flex-1">
            <div className="h-full bg-white rounded-lg border border-gray-200 p-6">
              {/* 搜索框 */}
              <div className="mb-6 flex items-center justify-between">
                <Input.Search
                  placeholder="搜索文章、技术、面试..."
                  prefix={<IconSearch />}
                  value={searchValue}
                  onChange={setSearchValue}
                  onSearch={handleSearch}
                  style={{ maxWidth: '400px' }}
                />
                <Text className="text-sm text-gray-500">
                  {searchValue ? `找到 ${filteredArticles.length} 篇相关文章` : `共发布 ${articles.length} 篇文章`}
                </Text>
              </div>

              {/* 文章列表 */}
              <div className="space-y-3 ">
                {selfArticles?.map((article) => (
                  <Card
                    key={article.id}
                    className="cursor-pointer hover-lift article-card border-0 shadow-sm hover:shadow-md transition-all duration-300"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <Title
                          heading={6}
                          className="mb-0 hover:text-blue-600 transition-colors leading-relaxed font-medium text-gray-900 flex items-center gap-4"
                          style={{ fontSize: '16px', lineHeight: '1.5' }}
                        >
                          {article.title}
                            <Tag
                              color={LifeContentTypeColor[article.contentType as keyof typeof LifeContentTypeColor]}
                              style={{
                                border: 'none',
                                // padding: '0 8px',
                                height: '20px',
                                fontSize: '12px',
                                borderRadius: '10px'
                              }}
                            >
                              {article.contentType}
                            </Tag>
                        </Title>
                      </div>

                      <div className="flex items-center space-x-3 text-gray-400 ml-4 flex-shrink-0">
                        <div className="flex items-center space-x-1">
                          <IconEye className="text-sm" />
                          <Text className="text-xs font-medium">{article.metadata.viewCount}</Text>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IconHeart className="text-sm" />
                          <Text className="text-xs font-medium">{article.metadata.likeCount}</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* 底部操作区 */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <Text className="text-gray-500 mb-2">
                    {searchValue ? `没有找到包含"${searchValue}"的文章` : '暂无文章'}
                  </Text>
                  <Text className="text-sm text-gray-400">
                    {searchValue ? '试试其他关键词吧' : '等待更多精彩内容'}
                  </Text>
                </div>
              )}
            </div>
          </div>
          {/* 右侧时间轴 */}
          <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
            <CampusCalander />
            <CompanyAlumni />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;
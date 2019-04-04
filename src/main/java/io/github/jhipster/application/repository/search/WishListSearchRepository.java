package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.WishList;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the WishList entity.
 */
public interface WishListSearchRepository extends ElasticsearchRepository<WishList, Long> {
}

import angular from 'angular';
import _ from 'lodash';

class Controller {
    constructor(
        $scope,
        $stateParams,
        $log,
        $window,
        modalService,
        organizationService,
        teamService,
        authService,
        platform,
        organization,
        members
    ) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$log = $log;
        this.$window = $window;
        this.modalService = modalService;
        this.organizationService = organizationService;
        this.teamService = teamService;
        this.authService = authService;

        this.platform = platform;
        this.organization = organization;
        this.members = members;
    }

    $onInit() {
        this.debouncedSearch = _.debounce(this.onSearch.bind(this), 500, {
            leading: false,
            trailing: true
        });

        this.isEffectiveAdmin = this.authService.isEffectiveAdmin([
            this.platform.id,
            this.organization.id
        ]);

        this.fetchPage();
    }

    onSearch(search) {
        this.fetchPage(0, search);
    }

    updatePagination(data) {
        this.pagination = {
            show: data.count > data.pageSize,
            count: data.count,
            currentPage: data.page + 1,
            startingItem: data.page * data.pageSize + 1,
            endingItem: Math.min((data.page + 1) * data.pageSize, data.count),
            hasNext: data.hasNext,
            hasPrevious: data.hasPrevious
        };
    }

    // fetchPage(page = 0, search = '') {
    fetchPage() {}
}

const Module = angular.module('pages.team.analyses', []);
Module.controller('TeamAnalysesController', Controller);

export default Module;
